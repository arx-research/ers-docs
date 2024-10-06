# Transferring Chips

## What Does Transferring Do?
Transferring a chip in ERS changes the reflected `ownerOf` that chip. It is presumed that most projects will represent the owner of an ERS chip through the `transferToken` PBT interface -- similar to conveying what address owns an NFT. The owner of a given chip may additionally modify properties of the chip onchain, namely associated primary and secondary services.

Depending on the given chip application, end user ownership of the PBT associated with a chip may or may not be important. For instance, if ERS is used entirely for redirect purposes, a developer may wish to retain ownership of all the chips in a given project and forgo allowing users the ability to `transferToken`. The `ProjectRegistrar` implementation is up to the developer adding the chips.

In earlier versions of ERS, transferring a chip was referred to as "claiming" a chip. This naming has been changed due to the fact that there is no distinction between the first "claim" of a chip and subsequent transfers to future owners.

## Example: Transferring a Chip
For an example of transferring a chip see [Transferring A Chip](../../scripts/chip-transfer.md) section in our scripts documentation.
