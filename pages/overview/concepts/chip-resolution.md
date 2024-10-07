# Understanding Chip Resolution

## Problem and Purpose
Given an arbitray chip discovered by a user, the chip's public key or `chipId` may be used to lookup information about the chip that:

1. Authenticates who manufactured the chip and embedded it into a project.
2. The current owner of the chip.
3. A `primaryService` with content that the chip should be redirected to upon scan (e.g a web app, URL or IPFS dapp)

## Lookup Functions
The `ChipRegistry` provides the following functions that can be used to lookup an associated chip. Likewise, chip information is mapped in `chipEnrollments`, including such information as what project a chip is assocaited with.

- `resolveChip` - the primary service content assocaited with a chip, including the `redirectUri`; this is the entry point for most dapps into ERS.
- `ownerOf` - the current owner of the chip, set to the project owner at the time of addition.
- `node` - the ERS node of the chip.
