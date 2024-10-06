# Creating A Project
This section details how to create a project using the `ers-scripts` repo.

## Set Up
_If you are trying to execute a transaction it is assumed that you have also read the [Set Up](setup.md) section. If you are just looking for an example read on_

The project creation script uses the `Developer` account information to call `addProject`. If not already set (for instance, to claim a Developer name in ERS) the relevant part of the `.env` file should look something like this:
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
yarn createProject --network [network]
```

This script will prompt you for several pieces of information:
1. Whether or not you wish to create a new project or add chips to an existing project; if you select an existing project, artifacts in `task_outputs` will be used to suggest options or you can manually enter the address of an existing project. (both cases will be chain specific based on the `network` argument)
2. How you would like to add `tokenUri` data: via a formatted CSV, using an existing URL, or skip. (this can be updated after contract deployment)
3. If you are on `localhost`, you will be prompted to select a manufacturer enrollment as well. For other chains this information comes from the hosted Arx enrollment data on Supabase.

You will be prompted to scan a QR code on your NFC-enabled smartphone; scan the QR code on your smartphone and follow the prompts to capture chip proof data. You can scan your chip by tapping it to the NFC reader on the back of your smartphone.


Note: If you are creating `tokenUri` data from a formatted CSV, make sure that you backup `task_outputs`. When chips are added to an existing project, `task_outputs` will be used to ensure that metadata from previously added chips is included in the final `tokenUri` data. If this data is missing, metadata with previously enrollment chips will be overwritten and their `tokenUri` will not resolve when looked up. 

## Defining Script Inputs
If you are planning to add rich metadata to chips then you can create an "input" CSV that is used to map content -- name, description, media -- to chips. Likewise, you can capture chip signature data independently from this script and prepopulate it in the same CSV file; this is useful in the case where you have a machine that is bulk scanning chips prior to being embedded.

### Example

```
edition,chipId,name,description,media_uri,media_mime_type,developerProof,projectRegistrar,notes
1,,cash,beautiful cash nft,task_params/cash.jpeg,image/jpg,,,,
```

### Arguments

- `edition` (required) - the edition number of a given chip; should be unique and incrementing from "1"
- `chipId` - the chipId, if known, to be scanned. Unless there is also a developerProof this should typically be left empty.
- `name` - the name of the chip; the approximates the name of an NFT (e.g. "Metafactory MF70 Bomber Jacket")
- `description` - the description of the chip
- `media_uri` - the media URI of the chip (if hosted) or the full local path to the chip (e.g. `/Users/arx/pictures/picture.jpg`)
- `media_mime_type` - the MIME type of the media, e.g. `image/jpeg`
- `developerProof` - the developerProof if already captured
- `projectRegistrar` - the projectRegistrar if already captured
- `notes` - nodes for Developer usage

