# What Are TSMs?
TSMs are modeled after Trusted Service Managers common to mobile networks. These actors take custody of chips from manufacturers and distribute manufacturer enrolled chips to end users or other projects that are building on top of the TSM's infrastructure.

## How is a TSM added?
TSMs can only be added by governance. In order to add a TSM the TSM must commit to a ers name they wish to use, creating a `[tsm].ers` name. This subdomain will be used to identify all projects launched under the TSM since all project ERS names will then have the format `[project].[tsm].ers`. Adding a TSM is a two-step process:
1. Once the TSM has selected their name it is passed in along with a `_tsmOwner` address to the `addAllowedTSM` function on the `TSMRegistry`
2. After step 1 is completed the TSM calls `createNewTSMRegistrar` which deploys a new `TSMRegistrar` contract that is owned by the `_tsmOwner` address. This contract is used to manage the TSM's projects. When calling `createNewTSMRegistrar` the caller can select an implmentation of `TSMRegistrarFactory` they wish to use. Once deployed the implementation cannot be changed. `TSMRegistrarFactories` are permissioned implementations that can only be added by governance.

## What can TSMs do?
Once the TSM has their `TSMRegistrar` deployed they can begin adding projects. TSMs have two options for adding projects:
1. TSMs can manually add projects with brands / companies that they personally vet by calling `addProject` on their `TSMRegistrar` from the owner address of their `TSMRegistrar`
2. They can change the owner of their `TSMRegistrar` to another contract address which handles permissioning and any other requirements the TSM wants to impose on projects using it's infrastructure. This contract can then call `addProject` on the `TSMRegistrar` to add projects.

## Adding Projects
In order to add a project the following information must be provided:
- **Name Hash**: The hash of the project's name. This is used to ensure that the project name is unique, and creates the `[project].tsm.ers` name for the project.
- **Project Registrar**: The address of the project's registrar. This is the contract that will be used to manage the project's chips. End-users will go here to claim their chips. The registrar must implement the `ProjectRegistrar` interface.
- **Project Merkle Root**: Similar to the manufacturer merkle root tree this is used to validate inclusion of the chip in the project, and hence the prove that the chip was distributed by the project / TSM. The project merkle tree leaves contain much more data than the manufacturer's, see below for a description of the data structure.
- **Project Public Key**: This is the public key of the project. The `projectPublicKey` is the key used to sign all TSM certificates and is also the address signed by each chip in order to create chip custody proofs (in order to prove that the TSM actually had physical ownership of the chip)
- **Transfer Policy**: The address of the transfer policy contract the project instantiates the chip with. This transfer policy contract defines how the PBT (see PBT section) representation of the chip can be transferred on-chain. Once the chip is claimed, the end-user can change the transfer policy to whatever they want (see PBT section for futher information on transfer policies).
- **Ownership Proof**: This is a signature of the `chainId` packed with the `ProjectRegistrar` address by the `projectPublicKey`. This signature is used to prove that the `projectPublicKey` is actually owned by the caller of the `addProject` function. Without this other projects could take the TSM certificates signed by another project's `projectPublicKey` and try to pass them off as their own.
- **Project Claim Data URI**: This is an IPFS URI that is stored on-chain. This URI points to the Project Merkle proofs for each chip in the project enrollment. In order to claim a chip the claimer needs to find their chip information at this URI.

Once a project has been added you can see the project's information by calling `projectEnrollments` on the `ChipRegistry` and passing in the `ProjectRegistrar` address of the project. Additionally, this opens up the ability for end-users to claim chips from the project via the `ProjectRegistrar`.

## Example: Creating a Project
For an example of creating a project see [Creating A Project](../../scripts/create-project.md) section in our scripts documentation.

