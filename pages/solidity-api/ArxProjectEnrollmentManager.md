# Solidity API

## ArxProjectEnrollmentManager

Smart contract that handles deployment of new Project Registrar contracts for new TSM projects.
This should be set as the owner of the TSM Registrar contract before adding any new projects.

### ProjectRegistrarDeployed

```solidity
event ProjectRegistrarDeployed(address projectRegistrar, address owner)
```

### NewTransferPolicySet

```solidity
event NewTransferPolicySet(contract ITransferPolicy transferPolicy)
```

### NewMaxBlockWindowSet

```solidity
event NewMaxBlockWindowSet(uint256 maxBlockWindow)
```

### chipRegistry

```solidity
contract IChipRegistry chipRegistry
```

### tsmRegistrar

```solidity
contract ITSMRegistrar tsmRegistrar
```

### ers

```solidity
contract IERS ers
```

### manufacturerRegistry

```solidity
contract IManufacturerRegistry manufacturerRegistry
```

### transferPolicy

```solidity
contract ITransferPolicy transferPolicy
```

### maxBlockWindow

```solidity
uint256 maxBlockWindow
```

### constructor

```solidity
constructor(contract IChipRegistry _chipRegistry, contract ITSMRegistrar _tsmRegistrar, contract IERS _ers, contract IManufacturerRegistry _manufacturerRegistry, contract ITransferPolicy _transferPolicy, uint256 _maxBlockWindow) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipRegistry | contract IChipRegistry | The Chip Registry contract of the ERS system |
| _tsmRegistrar | contract ITSMRegistrar | The TSM Registrar contract of the ERS system |
| _ers | contract IERS | The ERS Registry contract of the ERS system |
| _manufacturerRegistry | contract IManufacturerRegistry | The Manufacturer Registry contract of the ERS system |
| _transferPolicy | contract ITransferPolicy | The transfer policy contract for the project being deployed |
| _maxBlockWindow | uint256 | The maximum amount of blocks a signature used for updating chip table is valid for                                  passed to all ProjectRegistrar contracts deployed by this contract |

### addProject

```solidity
function addProject(address _projectManager, string _projectClaimDataUri, bytes32 _nameHash, bytes32 _merkleRoot, address _projectPublicKey, address _provingChip, struct IChipRegistry.TSMMerkleInfo _tsmMerkleInfo, struct IChipRegistry.ManufacturerValidation _manufacturerValidation, bytes _chipOwnershipProof, bytes _projectOwnershipProof) public
```

// TODO: what is CREATE2 exactly? I'm still unclear on this, can we add a link to their documentation? edit: did I get the link right?
// The TSM doesn't have to be new right?
Adds a TSM's new project to the ERS system by deploying the ProjectRegistrar contract via [CREATE2](https://docs.openzeppelin.com/cli/2.8/deploying-with-create2) and
registering it to the TSM Registrar. We use CREATE2 because we need the projectManager to provide proof of
ownership by signing a hash of the projectRegistrar address with the projectPublicKey. This is not possible
unless we know the address ahead of time, hence we use CREATE2 which allows us to know the address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectManager | address | The address that will be set as the owner of the project registrar contract |
| _projectClaimDataUri | string | URI pointing to location of off-chain data required to claim chips |
| _nameHash | bytes32 | Keccak256 hash of the human-readable name for the chip being claimed |
| _merkleRoot | bytes32 | Merkle root of the TSM Merkle Tree made up of the chips enrolled to this project |
| _projectPublicKey | address | Public key used in the generation of the TSM certificates |
| _provingChip | address |  |
| _tsmMerkleInfo | struct IChipRegistry.TSMMerkleInfo |  |
| _manufacturerValidation | struct IChipRegistry.ManufacturerValidation |  |
| _chipOwnershipProof | bytes |  |
| _projectOwnershipProof | bytes | Signed hash of the _projectRegistrar address by the _projectPublicKey |

### setTransferPolicy

```solidity
function setTransferPolicy(contract ITransferPolicy _transferPolicy) external
```
//TODO: also, in the architecture diagram, which one is ArxProjectEnrollmentManager?
// TODO: i thought transfer policy was set by the current item owner?
Sets the transfer policy for all projects deployed by this contract

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _transferPolicy | contract ITransferPolicy | The new transfer policy contract |

### setMaxBlockWindow

```solidity
function setMaxBlockWindow(uint256 _maxBlockWindow) external
```

Sets the max block window for all projects deployed by this contract. Max block window used to
validate ownership signatures for chip claims made through ProjectRegistrar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _maxBlockWindow | uint256 | The new max block window |

### _isNotZeroAddress

```solidity
function _isNotZeroAddress(address _address) internal pure returns (bool)
```

_Returns true if passed address is not the zero address_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address to check |

### _validateOwnershipAndTreeInclusion

```solidity
function _validateOwnershipAndTreeInclusion(address _provingChip, bytes _chipOwnershipProof, bytes32 _merkleRoot, struct IChipRegistry.TSMMerkleInfo _tsmMerkleInfo, struct IChipRegistry.ManufacturerValidation _manufacturerValidation) internal view
```

_Validates that the chip used as proof of ownership is in possession of the msg.sender, is included in the project merkle root, AND
is a chip that's been enrolled in the ManufacturerRegistry._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _provingChip | address | The chip used as proof of ownership |
| _chipOwnershipProof | bytes | The signature of the chip owner over the hash of the chainId and msg.sender |
| _merkleRoot | bytes32 | The merkle root of the project |
| _tsmMerkleInfo | struct IChipRegistry.TSMMerkleInfo | The TSM Merkle Info of the chip |
| _manufacturerValidation | struct IChipRegistry.ManufacturerValidation | Manufacturer Validation info for the chip |

### _deployProjectRegistrarAndAddProject

```solidity
function _deployProjectRegistrarAndAddProject(address _projectManager, bytes32 _merkleRoot, bytes32 _nameHash, address _projectPublicKey, bytes _projectOwnershipProof, string _projectClaimDataUri) internal
```

_Deploys a new ProjectRegistrar contract via CREATE2 and registers it to the TSM Registrar_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectManager | address | The address that will be set as the owner of the project registrar contract |
| _merkleRoot | bytes32 | Merkle root of the TSM Merkle Tree made up of the chips enrolled to this project |
| _nameHash | bytes32 | Keccak256 hash of the human-readable name for the chip being claimed |
| _projectPublicKey | address | Public key used in the generation of the TSM certificates |
| _projectOwnershipProof | bytes | Signed hash of the _projectRegistrar address by the _projectPublicKey |
| _projectClaimDataUri | string | URI pointing to location of off-chain data required to claim chips |

