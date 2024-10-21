# Creating A Service
This section details how to create a service using the `ers-scripts` repo.

## Set Up
_If you are trying to execute a transaction it is assumed that you have also read the [Set Up](setup.md) section. If you are just looking for an example read on_

To be able to create a service you first need to specify the Ethereum account you want to call `createService`, note that this address will be set as the "owner" of the service however that can be changed post-creation. To do this, you must input the private key of the account you wish to use into the `.env` file. The `.env` file should look something like this:
```
...
TESTNET_SERVICE_CREATOR_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
BASE_SERVICE_CREATOR_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
Replace the stand-in private keys (pulled from Hardhat) with the private key you wish to use. Make sure that you are using the correct private key for the __network__ you are deploying to.

Most Developers deploying Projects will also create their own Services, so this key will typically be the same as the Developer key.

## Executing the Script
The script to create a service is located in `tasks/serviceCreation.ts`. To execute the script run:
```bash
yarn createService --network [network]
```
You will be prompted for several pieces of information:
- __service-name__ is the name you wish to give your service, each name must be unique so if it has been chosen previously it will revert
- __content__ is an https or ipfs address of the content you wish to tie to the chips enrolled in the service
- __append-id__ is a boolean that determines whether or not the chipId will be appended to the end of the content string (useful for `tokenUri` data hosted in a directory or in IPFS)

When the script is run the `service-name` is transformed into a `bytes32` representation that is used as the `serviceId` for the service like so:
```typescript
const serviceId = ethers.utils.formatBytes32String(serviceName);
```
We then form the `ServiceRecord` struct that will be used to create the service, note that we convent the passed content into `bytes` and pass in the `CONTENT_APP_RECORD_TYPE` as the `recordType` (which is defined as `bytes32("contentApp")`):
```typescript
    const serviceRecord: ServiceRecord = {
      recordType: CONTENT_APP_RECORD_TYPE,
      content: stringToBytes(content),
      appendId
    };
```
The `ServiceRecord` struct and the `serviceId` are then passed to the smart contract:
```typescript
    await rawTx({
      from: serviceCreator,
      to: servicesRegistry.address,
      data: servicesRegistry.interface.encodeFunctionData(
        "createService",
        [
          serviceId,
          [serviceRecord]
        ]
      )
    });
```

