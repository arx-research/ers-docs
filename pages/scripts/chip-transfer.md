# Transferring A Chip
This section details how to transfer a chip using the `ers-scripts` repo. This assumes usage of the `PBTSimpleProjectRegistrar` which is what the `createProject` script uses by default.

## Set Up
_If you are trying to execute a transaction it is assumed that you have also read the [Set Up](setup.md) section. If you are just looking for an example read on_

To be able to claim a chip you first need to specify the Ethereum account you want to call `transferToken`, note that this address will be set as the "owner" of the chip. To do this, you must input the private key of the account you wish to use into the `.env` file. The `.env` file should look something like this:

```
...
TESTNET_CHIP_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
BASE_CHIP_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
Replace the stand-in private keys (pulled from Hardhat) with the private key you wish to use. Make sure that you are using the correct private key for the __network__ you are deploying to.

## Usage
Arguments:
`network`: The network you want to interact with (defaults to `hardhat`)

```bash
yarn transferToken --network [network]
```

You will be prompted by a QR code scanner to scan the chip to first get the `chipId` and subsequently again to create a `transferToken` signature. The signature will contain the address associated with the owner key specified in the Setup section above. Scan the QR code on your smartphone and follow the prompts to capture chip data. You can scan your chip by tapping it to the NFC reader on the back of your smartphone.

Once scanned, the resulting ownership proof and new chip owner address will be submitted:
```typescript
    await rawTx({
      from: chipOwner,
      to: projectRegistrar.address,
      data: projectRegistrar.interface.encodeFunctionData(
        "transferToken",
        [
          chipOwner,
          params.chipId,
          chipOwnershipProof,
          commitBlock.number,
          false,
          "0x" // Assuming payload is empty; change if necessary
        ]
      )
    });
```

Upon successful submission of the chip signature to the `transferToken`, the new owner of the chip should be reflected through ERS.

## Example

Here's what the CLI interaction looks like when running `yarn transferToken --network sepolia`:

```bash
$ yarn transferToken --network sepolia

📱 Please scan the QR code with your NFC-enabled smartphone to get the chip ID.
[QR Code displayed]

✓ Chip scanned successfully!
Chip ID: 0xabc123def456...
Project Registrar: 0x5678901234567890123456789012345678901234

📱 Please scan the chip again to create a transfer signature for the new owner.
[QR Code displayed]

✓ Transfer signature captured!
New Owner: 0x9876543210987654321098765432109876543210

Submitting transfer with the following details:
- Chip ID: 0xabc123def456...
- New Owner: 0x9876543210987654321098765432109876543210
- Project Registrar: 0x5678901234567890123456789012345678901234

✓ Chip ownership transferred successfully!
Transaction: 0x456789abc123...
The chip now belongs to: 0x9876543210987654321098765432109876543210
```