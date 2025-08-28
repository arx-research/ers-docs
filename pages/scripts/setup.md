# Getting Set Up

`ers-scripts` expects `git`, `node` >=20.5.0 <23.0.0 and the [yarn](https://classic.yarnpkg.com/lang/en/docs/install) package manager.

Clone `ers-scripts` repo, install dependencies and build `artifacts`:
```bash
git clone https://github.com/arx-research/ers-scripts.git
cd ers-scripts
yarn
yarn build
```

Next, set up an `.env` file:
```bash
cp .env.default .env
```

Finally, fill out the `REQUIRED` fields in `.env`. You need:
- A [Supabase](https://supabase.com/) account in order to access Arx manufacturer enrollments, 
- A [Filebase](https://filebase.com/) account in order to create tokenUri data for projects and upload content (may not be required in all cases, but highly recommended)
- An [Alchemy](https://www.alchemy.com/) account to carry out RPC commands (or you can set up a custom RPC in `hardhat.config.ts`).
- Private keys for the different roles, e.g. Developer and Service Creator. Make sure the associated accounts are funded to cover contract deployment and calling contract functions (e.g send some ETH on Sepolia or Base depending on where you will deploy to)

The private keys in the `.env.default` file are the default private keys used for local testing using Hardhat. __DO NOT USE THESE KEYS FOR ANY PUBLIC BLOCKCHAIN ACTIONS.__ We will note in this tutorial when to edit the private key portions of the `.env` file.

For purposes of this tutorial we will not need an `ETHERSCAN_API_KEY`, as that is only required for verifying contracts on Etherscan after deployment.

Note: `ers-scripts` expects you have `git`, `node` and the [yarn](https://classic.yarnpkg.com/lang/en/docs/install) package manager installed.

## Troubleshooting

`ers-scripts` assumes prior knowledge of using a CLI interface as well as installing and managing software packages like `node`. Typically errors will occur in several cases:
- An incorrect environment variable (e.g. bad API key, extra or missing character; for instance you might receive a `ProviderError: Unspecified origin not on whitelist.` if your Alchemy key is incorrect)
- An incorrect version of `node` (see `package.json` for the version requirements under the `engines` section)
- You are attempting to deploy to a non-existent network (note network names are case sensitive, e.g. `base`)
- You are attempting to run `ers-scripts` from the wrong directory
- You have insufficient ETH on the account you are trying to use to carry out an action (e.g. `createService`)
- The name you wish to register as a Developer is already taken
- The `tokenUri` input file you are using is incorrectly formatted

Visit the [ERS Discord](https://discord.com/invite/B2ReZXnt2v) for further assistance or open an issue.

See the `ers-scripts` [README](https://github.com/arx-research/ers-scripts/blob/master/README.md) for more information on using a `localhost` chain for local development and testing purposes (not usually recommended, typically Sepolia is best for testing).
