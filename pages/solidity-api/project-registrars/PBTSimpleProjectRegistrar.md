# Solidity API

## PBTSimpleProjectRegistrar

Base contract for ProjectRegistrars. Contains common functionality for all ProjectRegistrars including setting the root node
and claiming chips.

### ProjectChipAddition

```solidity
struct ProjectChipAddition {
  address chipId;
  address chipOwner;
  bytes32 nameHash;
  IChipRegistry.ManufacturerValidation manufacturerValidation;
  bytes custodyProof;
}
```

### Constructor

```solidity
constructor(
  IChipRegistry _chipRegistry, 
  IERS _ers, 
  IDeveloperRegistrar _developerRegistrar,
  string memory _name,
  string memory _symbol,
  string memory _baseURI,
  uint256 _maxBlockWindow,
  ITransferPolicy _transferPolicy
)
```

Constructor for `PBTSimpleProjectRegistrar`.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipRegistry | IChipRegistry | The chip registry of the ERS system being used |
| _ers | IERS | The ERS registry of the ERS system being used |
| _developerRegistrar | IDeveloperRegistrar | The DeveloperRegistrar that made this project |
| _name | string | The name of the custom PBT token |
| _symbol | string | The symbol of the custom PBT token |
| _baseURI | string | The base URI for the PBT tokens |
| _maxBlockWindow | uint256 | Maximum block window for transfers |
| _transferPolicy | ITransferPolicy | The transfer policy used by the project |

### setTransferPolicy

```solidity
function setTransferPolicy(ITransferPolicy _newPolicy) public onlyOwner()
```

Owner sets the transfer policy for PBT.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newPolicy | ITransferPolicy | The address of the new transfer policy. Zero address disables transfers. |

### setBaseURI

```solidity
function setBaseURI(string memory updatedBaseURI) public onlyOwner()
```

ONLY OWNER: Allows the contract owner to update the base URI for the PBT tokens.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| updatedBaseURI | string | The new base URI to set for the tokens |

### transferToken

```solidity
function transferToken(
  address to,
  address chipId,
  bytes calldata signatureFromChip,
  uint256 blockNumberUsedInSig,
  bool useSafeTransferFrom,
  bytes calldata payload
) public override(PBTSimple) returns (uint256 tokenId)
```

Allow a user to transfer a chip to a new owner. New owner must submit the transaction. Uses ChipPBT logic, which calls
TransferPolicy to execute the transfer of the PBT and chip, updating the chip's ERS node to keep data consistency.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | The address of the new chip owner |
| chipId | address | Chip ID (address) of chip being transferred |
| signatureFromChip | bytes | Signature from the chip being transferred |
| blockNumberUsedInSig | uint256 | Block number used in the signature |
| useSafeTransferFrom | bool | Indicates whether to use `safeTransferFrom` or `transferFrom` |
| payload | bytes | Encoded payload containing additional data required for the transfer |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token ID of the transferred chip |

### addChips

```solidity
function addChips(ProjectChipAddition[] calldata _chips) external onlyOwner()
```

ONLY OWNER: Allows the project manager to add chips to the project.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chips | ProjectChipAddition[] | Array of chip information required for claiming chips |

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) public view override(BaseProjectRegistrar, PBTSimple) returns (bool)
```

Returns true if the contract supports the given interface ID.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _interfaceId | bytes4 | The interface ID to check for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the contract supports the given interface ID |
