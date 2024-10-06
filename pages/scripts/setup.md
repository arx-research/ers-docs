# Getting Set Up

Before running any scripts, make sure you install all dependencies by running `yarn install` in the root directory.

Then make sure that you have set up your `.env` file by calling:
```bash
cp .env.default .env
```
The .env file should look something like this:

```
ETHERSCAN_KEY=
BASESCAN_API_KEY=
INFURA_TOKEN=
NAME_APPROVER_ENDPOINT=https://name.ers.run

TESTNET_DEPLOY_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
TESTNET_MANUFACTURER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

TESTNET_DEVELOPER_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
TESTNET_SERVICE_CREATOR_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
TESTNET_PROJECT_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

TESTNET_CHIP_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

BASE_DEPLOY_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
BASE_MANUFACTURER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

BASE_DEVELOPER_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
BASE_SERVICE_CREATOR_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
BASE_PROJECT_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

BASE_CHIP_OWNER_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

SUPABASE_URL=https://certificates.arx.org
SUPABASE_ANON_KEY=<your_supabase_anon_key>

FILEBASE_API_KEY=
FILEBASE_SECRET=
FILEBASE_BUCKET=my-bucket
```
The private keys in the file are the default private keys used for local testing using Hardhat. __DO NOT USE THESE KEYS FOR ANY PUBLIC BLOCKCHAIN ACTIONS.__ We will note in this tutorial when to edit the private key portions of the `.env` file.

If you want to post to IPFS you will need to fill out the Filebase fields. You can get an Filebase API key by navigating to [https://filebase.com/](https://filebase.com/), creating an account, and requesting an API key.

In order to submit any transactions onchain you will have to have your own `INFURA_TOKEN`. This can be made by creating an account on [Infura](https://infura.io/), creating a project, and then copying the project ID into the `INFURA_TOKEN` field.

In order to enroll Arx chips, you will need a Supabase anon key which will give you access to the Arx certificates database.

For purposes of this tutorial we will not need an `ETHERSCAN_API_KEY`, as that is only required for verifying contracts on Etherscan after deployment.
