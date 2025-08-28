# Solidity API

## IPBT

Interface for PBTs (Physical Backed Tokens). NFTs that are backed by a physical asset, through a chip embedded in the physical asset.

### tokenIdFor

```solidity
function tokenIdFor(address chipId) external view returns (uint256 tokenId)
```

Returns the ERC-721 `tokenId` for a given chip address.
Reverts if `chipId` has not been paired to a `tokenId`.
For minimalism, this will NOT revert if the `tokenId` does not exist.
If there is a need to check for token existence, external contracts can
call `ERC721.ownerOf(uint256 tokenId)` and check if it passes or reverts.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| chipId | address | The address for the chip embedded in the physical item (computed from the chip's public key) |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The ERC-721 token ID |

### isChipSignatureForToken

```solidity
function isChipSignatureForToken(uint256 tokenId, bytes calldata data, bytes calldata signature) external view returns (bool)
```

Returns true if `signature` is signed by the chip assigned to `tokenId`, else false.
Reverts if `tokenId` has not been paired to a chip.
For minimalism, this will NOT revert if the `tokenId` does not exist.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | ERC-721 `tokenId` |
| data | bytes | Arbitrary bytes string that is signed by the chip to produce `signature` |
| signature | bytes | EIP-191 signature by the chip to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if signature is valid for the chip assigned to the token |

### transferTokenWithChip

```solidity
function transferTokenWithChip(bytes calldata signature, uint256 blockNumberUsedInSig, bool useSafeTransfer, bytes calldata payload) external returns (uint256)
```

Transfers the token into the address. Returns the `tokenId` transferred.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| signature | bytes | EIP-191 signature by the chip |
| blockNumberUsedInSig | uint256 | The block number when the signature was created, to ensure recent signature |
| useSafeTransfer | bool | Whether to use safe transfer (calls `onERC721Received` on receiver if it's a contract) |
| payload | bytes | Additional data to pass with the transfer |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The token ID that was transferred |