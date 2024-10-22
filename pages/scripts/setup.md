# Getting Set Up

`ers-scripts` expects `git`,`node` 20.5.0+ and the [yarn](https://classic.yarnpkg.com/lang/en/docs/install) package manager.

Clone `ers-scripts` repo, install dependencies and build `artifacts`:
```bash
git clone https://github.com/arx-research/ers-scripts.git
cd ers-scripts
npm install yarn --global
yarn
yarn build
```

Next, set up an `.env` file:
```bash
cp .env.default .env
```

Finally, fill out the `REQUIRED` fields in `.env`. You will need few accounts (all offer free tiers at the time of writing):
- A [Supabase](https://supabase.com/) account in order to access Arx manufacturer enrollments, 
- A [Filebase](https://filebase.com/) account in order to create tokenUri data for projects and upload content (may not be required in all cases, but highly recommended)- An [Alchemy](https://www.alchemy.com/) account to carry out RPC commands (or you can set up a custom RPC in `hardhat.config.ts`).
- Private keys for the different roles, e.g. Developer and Service Creator. Make sure the associated accounts are funded to cover contract deployment and calling contract functions.

The private keys in the `.env.default` file are the default private keys used for local testing using Hardhat. __DO NOT USE THESE KEYS FOR ANY PUBLIC BLOCKCHAIN ACTIONS.__ We will note in this tutorial when to edit the private key portions of the `.env` file.

For purposes of this tutorial we will not need an `ETHERSCAN_API_KEY`, as that is only required for verifying contracts on Etherscan after deployment.

See the `ers-scripts` [README](https://github.com/arx-research/ers-scripts/blob/master/README.md) for more information on using a `localhost` chain for local development and testing purposes.
