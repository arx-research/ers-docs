# Solidity API

## ProjectRegistrar

Entry point for users claiming chips. Responsible for setting the ers name for each chip in its enrollment as [chip].project.tsm.ers.
The TSM Registrar sets the root node of the ProjectRegistrar when addProject is called on the TSMRegistrar
The owner of the contract can set the claim app URL

### RootNodeSet

```solidity
event RootNodeSet(bytes32 _rootNode)
```

### onlyTSMRegistrar

```solidity
modifier onlyTSMRegistrar()
```

### chipRegistry

```solidity
contract IChipRegistry chipRegistry
```

### ers

```solidity
contract IERS ers
```

### tsmRegistrar

```solidity
contract ITSMRegistrar tsmRegistrar
```

### maxBlockWindow

```solidity
uint256 maxBlockWindow
```

### rootNode

```solidity
bytes32 rootNode
```

### constructor

```solidity
constructor(address _projectManager, contract IChipRegistry _chipRegistry, contract IERS _ers, contract ITSMRegistrar _tsmRegistrar, uint256 _maxBlockWindow) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectManager | address | The address that will be set as the owner |
| _chipRegistry | contract IChipRegistry | The chip registry of the ERS system being used |
| _ers | contract IERS | The ERS registry of the ERS system being used |
| _tsmRegistrar | contract ITSMRegistrar | The TSMRegistrar that made this project |
| _maxBlockWindow | uint256 | The maximum amount of blocks a signature used for updating chip table is valid for |

### claimChip

```solidity
function claimChip(address _chipId, bytes32 _nameHash, struct IChipRegistry.TSMMerkleInfo _claimData, struct IChipRegistry.ManufacturerValidation _manufacturerValidation, uint256 _commitBlock, bytes _ownershipProof, bytes _tsmCertificate, bytes _custodyProof) external
```

Allow a chip holder to name chip to the ERS and enroll it to the Chip Registry. Chip owner will be
set as the msg.sender. Will revert if invalid proof of ownership is given or ownership proof is expired.
Will revert if chip is msg.sender since it cannot own itself.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | Address of the chip being claimed |
| _nameHash | bytes32 | Keccak256 hash of the human-readable name for the chip being claimed |
| _claimData | struct IChipRegistry.TSMMerkleInfo | Struct containing chip info |
| _manufacturerValidation | struct IChipRegistry.ManufacturerValidation | Struct with needed info for chip's manufacturer validation |
| _commitBlock | uint256 | The block the signature is tied to (used to put a time limit on the signature) |
| _ownershipProof | bytes | Chip signature of the chainId, _commitBlock, _nameHash, and msg.sender packed together |
| _tsmCertificate | bytes | Chip's public key/ID signed by the projectPublicKey |
| _custodyProof | bytes | Proof that the chip was in custody of the TSM, the projectPublicKey signed by the chip |

### setRootNode

```solidity
function setRootNode(bytes32 _rootNode) external
```

_ONLY TSM REGISTRAR: Set the root node for this project (ie project.tsm.ers)_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rootNode | bytes32 | The root node for this project |

