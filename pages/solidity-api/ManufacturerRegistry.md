# Solidity API

## ManufacturerRegistry

Registry for tracking and maintaining relevant info for Manufacturers. In order to make chips valid for the
protocol, manufacturers must register their chips in enrollments. Each enrollment will be assigned an id, which
must be referenced when adding chips to the registry. Enrollments have a merkle root of all chipIds (addresses)
that are valid for the enrollment. Manufacturer's can be found in three states:
1. Unregistered: manufacturers[_manufacturerId].registered = false. This is the default state for all manufacturers.
2. Registered: manufacturers[_manufacturerId].registered = true && manufacturers[_manufacturerId].owner != address(0).
3. Read-only: manufacturers[_manufacturerId].registered = true && manufacturers[_manufacturerId].owner == address(0).
   Once a manufacturerId has been put in this state it CANNOT leave it.

### ManufacturerAdded

```solidity
event ManufacturerAdded(bytes32 manufacturerId, address owner)
```

### ManufacturerRemoved

```solidity
event ManufacturerRemoved(bytes32 manufacturerId)
```

### EnrollmentAdded

```solidity
event EnrollmentAdded(bytes32 manufacturerId, bytes32 enrollmentId, bytes32 merkleRoot, address manufacturerCertSigner, address authModel, string chipValidationDataUri, string bootloaderApp, string chipModel)
```

### ManufacturerOwnerUpdated

```solidity
event ManufacturerOwnerUpdated(bytes32 manufacturerId, address newOwner)
```

### EnrollmentInfo

```solidity
struct EnrollmentInfo {
  uint256 manufacturerId;
  bytes32 merkleRoot;
  address manufacturerCertSigner;
  address authModel;
  string chipValidationDataUri;
  string bootloaderApp;
  string chipModel;
}
```

### ManufacturerInfo

```solidity
struct ManufacturerInfo {
  address owner;
  bool registered;
  bytes32[] enrollments;
  uint256 nonce;
}
```

### onlyManufacturer

```solidity
modifier onlyManufacturer(bytes32 _manufacturerId)
```

### enrollments

```solidity
mapping(bytes32 => struct ManufacturerRegistry.EnrollmentInfo) enrollments
```

### manufacturers

```solidity
mapping(bytes32 => struct ManufacturerRegistry.ManufacturerInfo) manufacturers
```

### constructor

```solidity
constructor(address _governance) public
```

_Constructor for ManufacturerRegistry. Sets owner to governance address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _governance | address | Address of governance |

### addChipEnrollment

```solidity
function addChipEnrollment(bytes32 _manufacturerId, bytes32 _merkleRoot, address _certSigner, address _authModel, string _chipValidationDataUri, string _bootloaderApp, string _chipModel) external returns (bytes32 enrollmentId)
```

_ONLY MANUFACTURER: Adds a new enrollment for an active manufacturer. Enrollment is assigned an id which is returned. Only owner address
associated with _manufacturerId can call this function. An "active" manufacturer is one with registered=true and a non-zero owner address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerId | bytes32 | Bytes32 identifier for manufacturer (i.e. could be hash of manufacturer name) |
| _merkleRoot | bytes32 | Merkle root of all chipIds (addresses) that are valid for this enrollment |
| _certSigner | address | Address of certificate signer for this enrollment |
| _authModel | address | Address of contract that implements example signature validation for a chip |
| _chipValidationDataUri | string | URI pointing to location of off-chain data required to validate chip is part of manufacturer enrollment |
| _bootloaderApp | string | Bootloader app for this enrollment |
| _chipModel | string | Chip model for this enrollment |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| enrollmentId | bytes32 | Id of enrollment |

### addManufacturer

```solidity
function addManufacturer(bytes32 _manufacturerId, address _owner) external
```

_ONLY OWNER: Registers a new manufacturer. Manufacturer is marked as registered forever once added so that history can't be mixed with
other manufacturers. To burn access the owner param is set to the zero address (in removeManufacturer). A manufacturer is considered "new"
if registered=false._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerId | bytes32 | Bytes32 identifier for manufacturer (i.e. could be hash of manufacturer name) |
| _owner | address | Address of Perp Vault contract |

### removeManufacturer

```solidity
function removeManufacturer(bytes32 _manufacturerId) external
```

_ONLY OWNER: Removes an active manufacturer putting their history in read-only mode. In order to remove access we burn the owner key,
this prevents history from being mixed in case a new manufacturer accidentally wants to use an old ID (it would revert and they would
need to choose an new ID)._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerId | bytes32 | Bytes32 identifier for manufacturer (i.e. could be hash of manufacturer name) |

### updateManufacturerOwner

```solidity
function updateManufacturerOwner(bytes32 _manufacturerId, address _newOwner) external
```

_ONLY MANUFACTURER: Updates the owner address for a manufacturer. Only owner address associated with _manufacturerId can call this
function._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerId | bytes32 | Bytes32 identifier for manufacturer (i.e. could be hash of manufacturer name) |
| _newOwner | address | Address of new owner |

### isEnrolledChip

```solidity
function isEnrolledChip(bytes32 _enrollmentId, uint256 _index, address _chipId, bytes32[] _merkleProof) external view returns (bool)
```

_Validate that _chipId is included in the merkle tree for _enrollmentId._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _enrollmentId | bytes32 | bytes32 identifier of the manaufacturer enrollment |
| _index | uint256 | Index of enrollment in the merkle tree |
| _chipId | address | Public key associated with the chip |
| _merkleProof | bytes32[] | Merkle Proof for _chipId's inclusion in _enrollmentId |

### getManufacturerInfo

```solidity
function getManufacturerInfo(bytes32 _manufacturerId) external view returns (struct ManufacturerRegistry.ManufacturerInfo)
```

### getEnrollmentInfo

```solidity
function getEnrollmentInfo(bytes32 _enrollmentId) public view returns (struct ManufacturerRegistry.EnrollmentInfo)
```

### getEnrollmentBootloaderApp

```solidity
function getEnrollmentBootloaderApp(bytes32 _enrollmentId) external view returns (string)
```

