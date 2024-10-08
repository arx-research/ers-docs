# What is a PBT?
A Physically Backed Token or PBT is a digital representation of a physical good as a non-fungible token. A PBT is similar to an NFT -- it represents a non-fungible entity onchain and may have associated metadata through a `tokenUri`, however, it differs in that ownership transfers are strictly gated by chip signatures. 

Per [EIP-5791](https://eips.ethereum.org/EIPS/eip-5791), the PBT was developed to solve the following problems:
- The ownership of the physical item and the ownership of the NFT are decoupled.
- Verifying the authenticity of the physical item requires action from a trusted 3rd party (e.g. StockX).

PBTs look to solve these problems and help usher in a new form of tokenized custody.

## Minting PBTs
Ultimately how PBTs are minted or given to chip holders is up to the `ProjectRegistrar` implementation. For the purposes of ERS, tokens are minted upon the addition of chips to a project. End users holding a chips may subsequently transfer or claim a chip (see [Chip Transfer](chip-transfer.md)).

## Transferring PBTs
The main difference between PBTs and standard ERC-721s is how they are transferred. Most ERC-721s are easily transferred by a simple on-chain call directly to the token contract or via `transferFrom` using an intermediary contract. PBTs have a more restricted transfer mechanism due to their physical backing. For PBTs there are two forms of transfer:
- `transferToken` - transfer executed by the receiver submitting message signed by chip, message commits to the receiver and a block hash after which the transfer must be submitted within an expiration period. An additional `extras` field may be used in conjunction with an optional Transfer Policy in order to limit or modify how transfers occur.

## Transfer Policies
If implemented for a given project, a transfer policy may use the `extras` field during `transferToken` to carry out additional validations or checks prior to transferringa  token. The contents and validations of the payload will be unique to the transfer policy.
