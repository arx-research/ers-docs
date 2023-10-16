# Getting Set Up

Before running any scripts, make sure you install all dependencies by running `yarn install` in the root directory.

Then make sure that you have set up your `.env` file by calling:
```bash
cp .env.default .env
```
The .env file should look something like this:

```
NFT_STORAGE_API_KEY=

ETHERSCAN_API_KEY=
INFURA_TOKEN=

GOERLI_DEPLOY_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
GOERLI_MANUFACTURER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
GOERLI_MANUFACTURER_SIGNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
GOERLI_SERVICE_CREATOR_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
GOERLI_PROJECT_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
GOERLI_PROJECT_PUBLIC_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
GOERLI_CHIP_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

MAINNET_DEPLOY_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
MAINNET_MANUFACTURER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
MAINNET_MANUFACTURER_SIGNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
MAINNET_SERVICE_CREATOR_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
MAINNET_PROJECT_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
MAINNET_PROJECT_PUBLIC_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
MAINNET_CHIP_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
The private keys in the file are the default private keys used for local testing using Hardhat. __DO NOT USE THESE KEYS FOR ANY PUBLIC BLOCKCHAIN ACTIONS.__ We will note in this tutorial when to edit the private key portions of the `.env` file.

If you want to post to IPFS you will need to fill out the `NFT_STORAGE_API_KEY` field. You can get an nft.storage API key by navigating to [this website](https://nft.storage/docs/quickstart/#get-an-api-token), creating an account, and requesting an API key.

In order to submit any transactions on-chain you will have to have your own `INFURA_TOKEN`. This can be made by creating an account on [Infura](https://infura.io/), creating a project, and then copying the project ID into the `INFURA_TOKEN` field.

For purposes of this tutorial we will not need an `ETHERSCAN_API_KEY`, as that is only required for verifying contracts on Etherscan after deployment.
