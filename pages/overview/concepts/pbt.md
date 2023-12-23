# What is a PBT?
A PBT is a digital representation of a physical good as a non-fungible token, in order words a Physically Backed Token. 

## Problems solved by PBTs
Per [EIP-5791](https://eips.ethereum.org/EIPS/eip-5791) which defines the standard for PBTs, the standard was developed to solve the following problems:
- The ownership of the physical item and the ownership of the NFT are decoupled.
- Verifying the authenticity of the physical item requires action from a trusted 3rd party (e.g. StockX).

PBTs look to solve these problems and help usher in a new form of tokenized custody.

## Minting PBTs
Ultimately how PBTs are minted or given to chip holders is up to the implementation, the EIP is very minimal. For the purposes of ERS, tokens are minted upon being claimed by a chip holder (see [Chip Claiming](chip-claim.md)). However, PBTs could also be minted on deploy or via some centralized manner if desired.

## Transferring PBTs
The main difference between PBTs and standard ERC-721s is how they are transferred. Most ERC-721s are easily transferred by a simple on-chain call directly to the token contract or via `transferFrom` using an intermediary contract. PBTs have a more restricted transfer mechanism due to their physical backing. For PBTs there are two forms of transfer:
- `transferTokenWithChip` - transfer executed by the receiver submitting message signed by chip, message commits to the receiver and a block hash after which the transfer must be submitted within an expiration period
- `transferToken` - Has the same attributes as above but also checks a Transfer Policy that can be used to lock transfers, require other covenants for transfer, or even allow PBTs to be escrowed for transfer

For the purposes of ERS we only implement `transferToken` as it is a superset of `transferTokenWithChip`. The main differences between the two functions are that `transferToken`. TODO: this looks like an incomplete sentence

## Transfer Policies
The current owner of a chip in the ERS system is allowed to set the transfer policy associated with a chip. A Transfer Policy is represented in the `ChipRegistry` by an Ethereum smart contract address that adheres to the ITransferPolicy interface. Calls to Transfer Policies are allowed to update state thus allowing them to do things like interact with escrow contracts. When transferring with `transferToken` the user specifies a payload that is meant to be consumed by the transfer policy, the contents and validations of the payload will be unique to the transfer policy.

// TODO: can we add an example transfer policy here?
