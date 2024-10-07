# Solidity API

## ManufacturerRegistry

Registry for tracking and maintaining relevant info for Manufacturers. In order to make chips valid for the
protocol, manufacturers must register their chips in enrollments. Each enrollment will be assigned an id, which
must be referenced when adding chips to the registry.

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
event EnrollmentAdded(bytes32 manufacturerId, bytes32 enrollmentId, address manufacturerCertSigner, address authModel, string chipValidationDataUri, string bootloaderApp, string chipModel)
```

### ManufacturerOwnerUpdated

```solidity
event ManufacturerOwnerUpdated(bytes32 manufacturerId, address newOwner)
```

### EnrollmentInfo

```solidity
struct EnrollmentInfo {
  uint256 manufacturerId;
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

Constructor for ManufacturerRegistry. Sets owner to governance address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _governance | address | Address of governance |

### addChipEnrollment

```solidity
function addChipEnrollment(bytes32 _manufacturerId, address _certSigner, address _authModel, string _chipValidationDataUri, string _bootloaderApp, string _chipModel) external returns (bytes32 enrollmentId)
```

ONLY MANUFACTURER: Adds a new enrollment for an active manufacturer. Enrollment is assigned an id which is returned. Only owner address
associated with _manufacturerId can call this function.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerId | bytes32 | Bytes32 identifier for manufacturer (i.e. could be hash of manufacturer name) |
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

ONLY OWNER: Registers a new manufacturer. Manufacturer is marked as registered forever once added.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerId | bytes32 | Bytes32 identifier for manufacturer (i.e. could be hash of manufacturer name) |
| _owner | address | Address of Perp Vault contract |

### removeManufacturer

```solidity
function removeManufacturer(bytes32 _manufacturerId) external
```

ONLY OWNER: Removes an active manufacturer, putting their history in read-only mode.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerId | bytes32 | Bytes32 identifier for manufacturer (i.e. could be hash of manufacturer name) |

### updateManufacturerOwner

```solidity
function updateManufacturerOwner(bytes32 _manufacturerId, address _newOwner) external
```

ONLY MANUFACTURER: Updates the owner address for a manufacturer.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerId | bytes32 | Bytes32 identifier for manufacturer |
| _newOwner | address | Address of new owner |

### isEnrolledChip

```solidity
function isEnrolledChip(bytes32 _enrollmentId, address _chipId, bytes calldata _manufacturerCertificate, bytes calldata _payload) external view returns (bool)
```

Validate that _chipId is included in the enrollment.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _enrollmentId | bytes32 | Bytes32 identifier of the manufacturer enrollment |
| _chipId | address | Public key associated with the chip |
| _manufacturerCertificate | bytes | Manufacturer certificate for the chip |
| _payload | bytes | Additional data required for verification |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Bool indicating whether the chip is valid |

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
