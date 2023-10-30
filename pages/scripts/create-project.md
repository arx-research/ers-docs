# Creating A Project
This section details how to create a project using the `ers-scripts` repo.

## Set Up
_If you are trying to execute a transaction it is assumed that you have also read the [Set Up](setup.md) section. If you are just looking for an example read on_

To be able to create a project you first need to specify the Ethereum account you want to call `addProject`, note that this address will be set as the "owner" of the project's `ProjectRegistrar` however that can be changed post-creation. To do this, you must input the private key of the account you wish to use into the `.env` file. Additionally, you need to specify the `projetPublicKey` for the project, this public key is used to sign all `tsmCertificate`s. The `.env` file should look something like this:
```
...
GOERLI_PROJECT_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
GOERLI_PROJECT_PUBLIC_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
MAINNET_PROJECT_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
MAINNET_PROJECT_PUBLIC_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
Replace the stand-in private keys (pulled from Hardhat) with the private key you wish to use. Make sure that you are using the correct private key for the __network__ you are deploying to.

## Defining Script Inputs
The inputs to the project creation script are more complex than simply inputting on a command line can allow. To get around this we use a JSON file to define the inputs to the script. The params file is located at `task_params/projectCreation.json` and it should look something like this:
```json
{
    "name": "",
    "chipDataLocation": "",
    "manufacturerValidationLocation": "task_outputs/addManufacturerEnrollment/",
    "tokenUriRoot": "ipfs://tokenUriRoot/",
    "lockinPeriod": 0,
    "serviceId": ""
}
```
If the file does not exist yet you can create it by calling:
`cp task_params/projectCreation.default.json task_params/projectCreation.json`

To fields in the file are defined as such:
- __name__: ERS name for the project
- __chipDataLocation__: This should be the location of a local file that has an array containing the chip data for the project, see below for the definition of the `chipData` object.
- __manufacturerValidationLocation__: Either local location of manufacturer validation file or an IPFS folder containing the `ManufacturerValidation` information for chips in the project
- __tokenUriRoot__: IPFS URI root for the token URIs of the chips in the project
- __lockinPeriod__: Timestamp after which user can change the primary service associated with chip (see [Understanding Services](../overview//concepts/services.md) for more information on services)
- __serviceId__: ID of the service being initially tied to the chips in the project

In order to create a valid chipData array it must adhere to the `ChipInfo` definition:
```typescript
{
    "chipId": "",
    "pk2": "",
    "enrollmentId": ""
}
```
This data is either fetchable from the Manufacturer Enrollment data posted to IPFS as part of the manufacturer enrollment process or can be created locally by scanning the chips and associating their `chipId` with the `enrollmentId` of that chip.

## Executing the Script
The script to create a project is located in `tasks/projectCreation.ts`. To execute the script run:
```bash
yarn createProject --network [network] --post [true/false]
```
Where: 
- __post__ indicate whether to post the resulting project files to IPFS. These files are used to help users claim the chip, it's recommended to have this set to `true` for any project that will be used by the public. Note that you must have an `NFT_STORAGE_API_KEY` set (see [Setup](setup.md))

When the script is run the first step is using `lib-ers` to create the project's merkle tree:
```typescript
    const ersInstance: ERS = await createERSInstance(hre);

    // Create merkle tree
    const chipInfo: ChipInfo[] = JSON.parse(fs.readFileSync(params.chipDataLocation, 'utf-8'));
    await ersInstance.projectCreation.createTSMMerkleTree(
      chipInfo,
      params.tokenUriRoot,
      params.lockinPeriod,
      params.serviceId
    );
```

Next we use the `projectPublicKey` to create `tsmCertificate`s and `custodyProof`s for each chip. This requires scanning each chip to sign the `custodyProof`s:
```typescript
    async function createCertificates(): Promise<any> {
      const certSigner = await hre.ethers.getSigner(projectPublicKey);
      const tsmCertificates: string[] = [];
      for (let i = 0; i < chipInfo.length; i++) {
        const packedCert = ethers.utils.solidityPack(["address"], [chipInfo[i].chipId]);
        tsmCertificates.push(await certSigner.signMessage(ethers.utils.arrayify(packedCert)));
      }

      const custodyProofs: string[] = new Array<string>(chipInfo.length);
      const message = ethers.utils.solidityPack(["address"], [projectPublicKey]);     
      for (let i = 0; i < chipInfo.length; i++) {
        const sig = await getChipSigWithGateway(gate, message);
        const index = chipInfo.findIndex(item => item.chipId == sig.etherAddress);
        
        if (index == -1) {
          console.log(`Could not find chipId ${sig.etherAddress} in chipInfo`);
          i -= 1;
          continue
        };

        if (custodyProofs[index]) {
          console.log(`ChipId ${chipInfo[i].chipId} already has an ownership proof`);
          i -= 1;
          continue
        }

        console.log(`Ownership proof created for chipId: ${chipInfo[i].chipId}`)
        custodyProofs[index] = sig.signature.ether;
      }
      return { tsmCertificates, custodyProofs };
    }
```
Next we need to pre-calculate the `projectRegistrarAddress` since this is required to create the project enrollment files posted to IPFS. This is doable because we use CREATE2 in the contracts, and can be done using `lib-ers`:
```typescript
    ersInstance.projectCreation.calculateProjectRegistrarAddress(projectOwner, ersInstance.projectCreation.tsmTree.getHexRoot())
```

Now we have everything we need to create and post the project enrollment files to IPFS:
```typescript
    function _generateProjectEnrollmentFiles(
      ers: ERS,
      certificates: string[],
      custodyProof: string[]
    ): File[] {
      let projectEnrollmentFiles: File[] = [];
      for (let i = 0; i < ers.projectCreation.treeData.length; i++) {
        const chipData = ers.projectCreation.treeData[i];
        let chipValidationInfo: TSMMerkleProofInfo = {
          tsmIndex: BigNumber.from(i),
          serviceId: chipData.primaryServiceId,
          lockinPeriod: chipData.lockinPeriod,
          tokenUri: chipData.tokenUri,
          tsmProof: ers.projectCreation.tsmTree.getProof(i, chipData),
        };
  
        let projectEnrollment: ProjectEnrollmentIPFS = {
          enrollmentId: chipData.enrollmentId,
          projectRegistrar: projectRegistrarAddress,
          TSMMerkleInfo: chipValidationInfo,
          tsmCertificate: certificates[i],
          custodyProof: custodyProof[i]
        };
        projectEnrollmentFiles.push(new File([JSON.stringify(projectEnrollment)], `${chipData.chipId}.json`.toLowerCase(), { type: 'application/json' }));
      }
    
      return projectEnrollmentFiles;
    }
```
Finally, we need three last pieces of data to create the project:
1. Chip ownership proof - a proving chip is selected and used to sign the `chipOwnershipProof`
```typescript
    const chainId = BigNumber.from(await hre.getChainId());
    const packedMsg = ethers.utils.solidityPack(["uint256", "address"], [chainId, projectOwner]);
    const response = await getChipSigWithGateway(gate, packedMsg);

    const chipOwnershipProof = response.signature.ether;
```
2. Project ownership proof - signature of the `projectRegistrarAddress` by the `projectPublicKey`
```typescript
    async function createProjectOwnershipMessage(projectRegistrarAddress: Address): Promise<string> {
      const signer = hre.ethers.provider.getSigner(projectPublicKey);
      const chainId = BigNumber.from(await signer.getChainId());

      const packedMsg = ethers.utils.solidityPack(["uint256", "address"], [chainId, projectRegistrarAddress]);

      return signer.signMessage(ethers.utils.arrayify(packedMsg));
    }
```
3. Proving chip manufacturer validation is grabbed from the `manufacturerValidationLocation`
```typescript
    async function getProvingChipManufacturerValidation(chip: Address): Promise<ManufacturerEnrollmentIPFS> {
      if (params.manufacturerValidationLocation.slice(0, 5) == 'https') {
        return (await axios.get(params.manufacturerValidationLocation + `${provingChip.toLowerCase()}.json`)).data;
      } else {
        return JSON.parse(
          fs.readFileSync(params.manufacturerValidationLocation + `${provingChip}.json`, 'utf-8')
        );
      }
    }
```

Finally we can put all these pieces together and submit the `addProject` transaction:
```typescript
      await rawTx({
        from: projectOwner,
        to: enrollmentManagerAddress,
        data: enrollmentManager.interface.encodeFunctionData(
          "addProject",
          [
            projectOwner,
            chipValidationDataUri,                              // URI of the project enrollment files
            calculateLabelHash(params.name),                    // Calculated label hash using defined name
            ersInstance.projectCreation.tsmTree.getHexRoot(),
            projectPublicKey,
            provingChip,
            chipClaimInfo.TSMMerkleInfo,                        // TSMMerkleInfo of the proving chip
            provingChipManufacturerInfo.validationInfo,
            chipOwnershipProof,
            projectOwnershipProof
          ]
        )
      });
```
