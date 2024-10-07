# Solidity API

## ChipRegistry

Entrypoint for resolving chips added to ERS Protocol. Developers can enroll new projects into this registry by 
specifying a ProjectRegistrar to manage chip additions. Chip additions are forwarded from ProjectRegistrars that typically 
mint an ERC-721 compliant "token" of the chip to the claimant and other metadata associated with the chip is set. 
Any project looking to integrate ERS chips should get resolution information about chips from this address. Because 
chips are represented as tokens any physical chip transfers should also be completed on-chain in order to get full 
functionality for the chip.

### ProjectEnrollmentAdded

```solidity
event ProjectEnrollmentAdded(address indexed developerRegistrar, address indexed projectRegistrar, bytes32 nameHash, address servicesRegistry, bytes32 serviceId)
```

### ProjectEnrollmentRemoved

```solidity
event ProjectEnrollmentRemoved(address indexed developerRegistrar, address indexed projectRegistrar, bytes32 nameHash)
```

### ChipAdded

```solidity
event ChipAdded(address indexed chipId, address indexed projectRegistrar, bytes32 indexed manufacturerEnrollmentId, address owner, bytes32 serviceId, bytes32 ersNode, bool hasDeveloperCustodyProof)
```

### MaxLockinPeriodUpdated

```solidity
event MaxLockinPeriodUpdated(uint256 maxLockinPeriod)
```

### MigrationSignerUpdated

```solidity
event MigrationSignerUpdated(address migrationSigner)
```

### RegistryInitialized

```solidity
event RegistryInitialized(address ers, address developerRegistry)
```

### ProjectInfo

```solidity
struct ProjectInfo {
  bytes32 nameHash;
  IDeveloperRegistrar developerRegistrar;
  IServicesRegistry servicesRegistry;
  bool chipsAdded;
  bytes32 serviceId;
  uint256 lockinPeriod;
  uint256 creationTimestamp;
}
```

### ChipInfo

```solidity
struct ChipInfo {
  bytes32 nameHash;
  address projectRegistrar;
  bytes32 manufacturerEnrollmentId;
  bool chipEnrolled;
}
```

### EIP712_SIGNATURE_DOMAIN

```solidity
string public constant EIP712_SIGNATURE_DOMAIN
```

### EIP712_SIGNATURE_VERSION

```solidity
string public constant EIP712_SIGNATURE_VERSION
```

### manufacturerRegistry

```solidity
IManufacturerRegistry public immutable manufacturerRegistry
```

### ers

```solidity
IERS public ers
```

### developerRegistry

```solidity
IDeveloperRegistry public developerRegistry
```

### initialized

```solidity
bool public initialized
```

### migrationSigner

```solidity
address public migrationSigner
```

### projectEnrollments

```solidity
mapping(IProjectRegistrar => ProjectInfo) public projectEnrollments
```

### chipEnrollments

```solidity
mapping(address => ChipInfo) public chipEnrollments
```

### maxLockinPeriod

```solidity
uint256 public maxLockinPeriod
```

### constructor

```solidity
constructor(IManufacturerRegistry _manufacturerRegistry, uint256 _maxLockinPeriod, address _migrationSigner) public
```

Constructor for ChipRegistry

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerRegistry | contract IManufacturerRegistry | Address of the ManufacturerRegistry contract |
| _maxLockinPeriod | uint256 | The maximum amount of time a chip can be locked into a service for beyond the project's creation timestamp |
| _migrationSigner | address | Address of the migration signer |

### addProjectEnrollment

```solidity
function addProjectEnrollment(IProjectRegistrar _projectRegistrar, bytes32 _nameHash, IServicesRegistry _servicesRegistry, bytes32 _serviceId, uint256 _lockinPeriod) external
```

_ONLY Developer REGISTRAR: Enroll new project in ChipRegistry. This function is only callable by DeveloperRegistrars. In order to use
this function the project must first sign a message of the _projectRegistrar address with the _projectPublicKey's matching
private key. This key MUST be the same key used to sign all the chip certificates for the project._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectRegistrar | contract IProjectRegistrar | Address of the ProjectRegistrar contract |
| _nameHash | bytes32 | Label of the project's node in the ERS tree |
| _servicesRegistry | contract IServicesRegistry | Address of the ServicesRegistry contract |
| _serviceId | bytes32 | The serviceId of the project's preferred service |
| _lockinPeriod | uint256 | The amount of time a chip can be locked into a service for beyond the project's creation timestamp |

### addChip

```solidity
function addChip(address _chipId, address _chipOwner, bytes32 _nameHash, IChipRegistry.ManufacturerValidation memory _manufacturerValidation, bytes memory _custodyProof) external
```

_Allow a project to add chips. Enrollment allows the chip to resolve to the project's preferred service. Additionally, claiming creates a Physically-Bound Token representation of the chip._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | Chip ID (address) |
| _chipOwner | address | Owner of the chip |
| _nameHash | bytes32 | Label of the node in the ERS tree |
| _manufacturerValidation | struct IChipRegistry.ManufacturerValidation | Struct containing information for chip's inclusion in manufacturer's enrollment |
| _custodyProof | bytes | Proof of chip custody by the developer |

### removeProjectEnrollment

```solidity
function removeProjectEnrollment(IProjectRegistrar _projectRegistrar) external
```

_ONLY Developer REGISTRAR: Remove project enrollment from ChipRegistry._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectRegistrar | contract IProjectRegistrar | Address of the ProjectRegistrar contract |

### setChipNodeOwner

```solidity
function setChipNodeOwner(address _chipId, address _newOwner) external
```

_Set the owner of a chip through its projectRegistrar._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip public key |
| _newOwner | address | The new owner of the chip |

### initialize

```solidity
function initialize(IERS _ers, IDeveloperRegistry _developerRegistry) external
```

_ONLY OWNER: Initialize ChipRegistry contract with ERS and Developer Registry addresses._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ers | contract IERS | Address of the ERS contract |
| _developerRegistry | contract IDeveloperRegistry | Address of the DeveloperRegistry contract |

### updateMaxLockinPeriod

```solidity
function updateMaxLockinPeriod(uint256 _maxLockinPeriod) external
```

_ONLY OWNER: Update the maximum amount of time a chip can be locked into a service for beyond the project's creation timestamp._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _maxLockinPeriod | uint256 | The new maximum amount of time a chip can be locked into a service for beyond the project's creation timestamp |

### updateMigrationSigner

```solidity
function updateMigrationSigner(address _migrationSigner) external
```

_ONLY OWNER: Update the migration signer address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _migrationSigner | address | The new migration signer address |

### resolveChip

```solidity
function resolveChip(address _chipId) external view returns (IServicesRegistry.Record[] memory)
```

_Return the primary service content._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip public key |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | IServicesRegistry.Record[] | The content associated with the chip (if chip has been claimed already) |

### node

```solidity
function node(address _chipId) public view returns (bytes32)
```

_Get the chip's ERS node (function name follows ENS reverse registar naming conventions)._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip public key |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | The ERS node of the chip |

### ownerOf

```solidity
function ownerOf(address _chipId) public view returns (address)
```

_Get the owner of a chip through its projectRegistrar._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip public key |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The owner of the chip |

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) public view returns (bool)
```

_Check if the contract supports a specific interface._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _interfaceId | bytes4 | The interface ID to check for |

