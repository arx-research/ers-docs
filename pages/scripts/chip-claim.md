# Claiming A Chip
This section details how to claim a chip using the `ers-scripts` repo.

## Set Up
_If you are trying to execute a transaction it is assumed that you have also read the [Set Up](setup.md) section. If you are just looking for an example read on_

To be able to claim a chip you first need to specify the Ethereum account you want to call `claimChip`, note that this address will be set as the "owner" of the chip however that can be changed post-creation. To do this, you must input the private key of the account you wish to use into the `.env` file. The `.env` file should look something like this:

```
...
GOERLI_CHIP_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
MAINNET_CHIP_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
Replace the stand-in private keys (pulled from Hardhat) with the private key you wish to use. Make sure that you are using the correct private key for the __network__ you are deploying to.

## Defining Script Inputs
The inputs to the claim chip script are more complex than simply inputting on a command line can allow. To get around this we use a JSON file to define the inputs to the script. The params file is located at `task_params/claimChip.json` and it should look something like this:
```json
{
    "name": "",
    "chipClaimDataLocation": "",
    "manufacturerValidationLocation": ""
}
```
If the file does not exist yet you can create it by calling:
`cp task_params/claimChip.default.json task_params/claimChip.json`

To fields in the file are defined as such:
- __name__: ERS name for the chip
- __chipClaimDataLocation__: Either local location of chip's claim data file or an IPFS folder containing the `ProjectEnrollmentIPFS` information for chips in the project
- __manufacturerValidationLocation__: Either local location of manufacturer validation file or an IPFS folder containing the `ManufacturerValidation` information for chips in the project

The chipClaimData has the following definition:
```typescript
export interface ProjectEnrollmentIPFS {
  projectRegistrar: Address,
  enrollmentId: string,
  TSMMerkleInfo: TSMMerkleProofInfo,
  tsmCertificate: string,
  custodyProof: string
}
```
## Executing the Script
The script to claim a chip is located in `tasks/projectCreation.ts`. To execute the script run:
```bash
yarn claimChip --network [network]
```

When the script is run the first step is to scan the chip being claimed using our gateway utility:
```typescript
export async function getChipPublicKeys(gate: any): Promise<[Address, Address]> {
  let cmd = {
    "name": "get_pkeys",
  };

  const rawKeys = (await gate.execHaloCmd(cmd)).output;

  return [rawKeys.etherAddresses['1'], rawKeys.etherAddresses['2']];
}
```
We then call out to get the `chipClaimData` and `manufacturerValidation` from there respective locations. After that we create a `chipOwnershipProof` that ties the `msg.sender` of the transaction to the chip being claimed:
```typescript
    const chainId = BigNumber.from(await hre.getChainId());
    const commitBlock = BigNumber.from(await hre.ethers.provider.getBlockNumber());
    const nameHash = calculateLabelHash(params.name);

    const packedMsg = ethers.utils.solidityPack(["uint256", "uint256", "bytes32", "address"], [chainId,commitBlock, nameHash, chipOwner]);

    const chipOwnershipProof = (await getChipSigWithGateway(gate, packedMsg)).signature.ether;
```
Note that we also calculate the `nameHash` of the chip being claimed, which is an ENS compliant hash of the `name` passed in the params file.

Finally, we pass everything from above to the `ProjectRegistrar` to claim the chip:
```typescript
    await rawTx({
      from: chipOwner,
      to: projectRegistrar.address,
      data: projectRegistrar.interface.encodeFunctionData(
        "claimChip",
        [
          chipId,
          nameHash,
          chipIdClaimInfo.TSMMerkleInfo,
          chipIdManufacturerInfo.validationInfo,
          commitBlock,
          chipOwnershipProof,
          chipIdClaimInfo.tsmCertificate,
          chipIdClaimInfo.custodyProof
        ]
      )
    });
```
