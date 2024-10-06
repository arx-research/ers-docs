# Claiming A Developer Name
This script claims a developer name if available and deploys a `DeveloperRegistrar`. The script will reserve the developer name in the ERS namespace, (e.g. `brand.ers`).

## Set Up
_If you are trying to execute a transaction it is assumed that you have also read the [Set Up](setup.md) section._

To claim a name you first need to specify the Ethereum account you want as the `Developer` in ERS by inputting the private key of the account you wish to use into the `.env` file. The corresponding key in the `.env` file is `$CHAIN_DEVELOPER_OWNER_PRIVATE_KEY`, for example:

```
...
TESTNET_DEVELOPER_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
BASE_DEVELOPER_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
Replace the stand-in private keys (pulled from Hardhat) with the private key you wish to use. Make sure that you are using the correct private key for the __network__ you are deploying to.

## Usage
Arguments:
`network`: The network you want to interact with (defaults to `hardhat`)

```bash
yarn createDeveloperRegistrar --network [network]
```

You will be prompted to enter your desired developer name. If the name is available, the script will first claim it from https://name.ers.run which issues a `nameApprovalProof`, and subsequently deploy a developer registrar through the `DeveloperRegistry`.

Note: Most common names are reserved, and if not reserved a name will be checked to match the enrolling developer address with the ENS owner address. If you would like to enroll using a reserved name, please contact names@ers.to -- note that trademarks, well known brand names and domain history are all factors that will be considered when requesting a reserved name.