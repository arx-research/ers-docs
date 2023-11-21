# Claiming Chips

## What Does Claiming Do?
When a user claims a chip they instantiate the chip data onchain, creating an-NFT like representation of the chip called a PBT (see [What is a PBT](pbt.md)). By claiming the digital representation, the claimer may add various secondary services to their chip which can be resolved when the chip is scanned. 

Practically, claiming a chip writes offchain data about it onchain, including enrollment data such as:
1. The claimer's ERS name - this looks like [name].project.tsm.ers
2. A `primaryService` - This is the service that your chip will default bring up on resolution, see [Understanding Services](services.md) for more information on services.

Once claimed you can add additional `secondaryServices` for optional resolution by clients. For instance, a `secondaryService` associated with a chip could include a ticketing service for a piece of luxury merchandise that otherwise resolves to an app for authentication.

## How to Claim a Chip
All chip claims are processed by the `ProjectRegistrar` associated with the project the chip is enrolled in. `ProjectRegistrar`s are not created by ERS, but instead they are made by the project owner. A `ProjectRegistrar` is responsible for managing the enrollment of chips into the project. This means that the data requirements may differ depending on the project, however each `ProjectRegistrar` is required to do two things:
1. Call the `ERSRegistry` to create and ERS name for the chip being enrolled
2. Call the `ChipRegistry` to enroll the chip in the system

When calling the `ChipRegistry` the `ProjectRegistrar` must provide the following data:
- `chipId` - the unique identifier for the chip
- `chipClaimData` - struct containing data required to validate the chip's inclusion in the project, chip owner address, and the chip's ERS node
- `manufacturerValidation` - struct containing data required to validate the chip's enrollment in the system
- `tsmCertificate` - Signature proving the TSM acknowledges the chip as part of the project
- `custodyProof` - Signature proving the chip was custodied by the project at some point

The `chipClaimData` struct is defined as follows:
```
    struct TSMMerkleInfo {
        uint256 tsmIndex;
        bytes32 serviceId;
        uint256 lockinPeriod;
        string tokenUri;
        bytes32[] tsmProof;
    }

    struct ChipClaim {
        address owner;
        bytes32 ersNode;
        TSMMerkleInfo tsmMerkleInfo;
    }
```
In order for the claim to go through the chip must:
1. Not have been previously claimed by ANY project
2. Have the correct `ERSRegistry` state set by the `ProjectRegistrar`
3. Have valid Manufacturer and project inclusion proofs
4. Have valid certificates from the TSM

## Example: Claiming a Chip
For an example of claiming a chip see [Claiming A Chip](../../scripts/chip-claim.md) section in our scripts documentation.
