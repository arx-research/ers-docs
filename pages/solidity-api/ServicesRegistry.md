# Solidity API

## ServicesRegistry

Contract for creating and updating services for service owners and adding/removing services for chip owners. Services
contain a recordType and record content. The recordType is intended to be a standardized off-chain string that clients
can use to interpret the record content. Record types could be a tokenUri, a URL, a smart contract, or any other value.
Chips are always enrolled in a primary service, in most cases this is the service the chip should resolve to when
scanned. Additionally, a chip can be enrolled in secondary services that allow it to access additional functionality.
Primary services have a timelock that must expire before the primary service can be changed. Secondary services can be
added and removed at any time. The primary service cannot be one of the chip's secondary services.

### ServiceCreated

```solidity
event ServiceCreated(bytes32 serviceId, address owner)
```

### ServiceRecordAdded

```solidity
event ServiceRecordAdded(bytes32 serviceId, bytes32 recordType, bytes content, bool appendId)
```

### ServiceRecordEdited

```solidity
event ServiceRecordEdited(bytes32 serviceId, bytes32 recordType, bytes newContent, bool appendId)
```

### ServiceRecordRemoved

```solidity
event ServiceRecordRemoved(bytes32 serviceId, bytes32 recordType)
```

### ServiceOwnershipTransferred

```solidity
event ServiceOwnershipTransferred(bytes32 serviceId, address oldOwner, address newOwner)
```

### PrimaryServiceUpdated

```solidity
event PrimaryServiceUpdated(address chipId, bytes32 newPrimaryService, bytes32 oldPrimaryService, uint256 serviceTimelock)
```

### SecondaryServiceAdded

```solidity
event SecondaryServiceAdded(address chipId, bytes32 serviceId)
```

### SecondaryServiceRemoved

```solidity
event SecondaryServiceRemoved(address chipId, bytes32 serviceId)
```

### RecordContent

```solidity
struct RecordContent {
  bool enabled;
  bool appendId;
  bytes content;
}
```

### ServiceRecord

```solidity
struct ServiceRecord {
  bytes32 recordType;
  bytes content;
  bool appendId;
}
```

### ServiceInfo

```solidity
struct ServiceInfo {
  address owner;
  bytes32[] recordTypes;
}
```

### ChipServices

```solidity
struct ChipServices {
  bytes32 primaryService;
  uint256 serviceTimelock;
  bytes32[] secondaryServices;
}
```

### onlyServiceOwner

```solidity
modifier onlyServiceOwner(bytes32 _serviceId)
```

### onlyChipOwner

```solidity
modifier onlyChipOwner(address _chipId)
```

### chipRegistry

```solidity
contract IChipRegistry chipRegistry
```

### maxBlockWindow

```solidity
uint256 maxBlockWindow
```

### chipServices

```solidity
mapping(address => struct ServicesRegistry.ChipServices) chipServices
```

### enrolledServices

```solidity
mapping(address => mapping(bytes32 => bool)) enrolledServices
```

### serviceInfo

```solidity
mapping(bytes32 => struct ServicesRegistry.ServiceInfo) serviceInfo
```

### serviceRecords

```solidity
mapping(bytes32 => mapping(bytes32 => struct ServicesRegistry.RecordContent)) serviceRecords
```

### constructor

```solidity
constructor(contract IChipRegistry _chipRegistry, uint256 _maxBlockWindow) public
```

Constructor for ServicesRegistry

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipRegistry | contract IChipRegistry | Address of the ChipRegistry contract |
| _maxBlockWindow | uint256 | The maximum amount of blocks a signature used for updating chip table is valid for |

### createService

```solidity
function createService(bytes32 _serviceId, struct ServicesRegistry.ServiceRecord[] _serviceRecords) external
```

Creates a new service. Services contain multiple different record types which could be a tokenUri, a URL or any other
unstructured content. Each record is identified by its recordType. We expect off-chain standardization around recordTypes and
do not maintain a canonical on-chain list of records. Associated with each recordType is a content string which is intended
to be interpreted by the client. The service ID must be unique and the service records must not contain duplicate record types.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _serviceId | bytes32 | The service ID |
| _serviceRecords | struct ServicesRegistry.ServiceRecord[] | The service records |

### addServiceRecords

```solidity
function addServiceRecords(bytes32 _serviceId, struct ServicesRegistry.ServiceRecord[] _serviceRecords) external
```

ONLY SERVICE OWNER: Adds new service records to an existing service. The service records must not contain duplicate record types or
have an existing record of the same type. Don't need to explicitly check that the service has been created because if it has then there
should be an owner address if not then the owner address is the zero address thus it will revert.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _serviceId | bytes32 | The service ID |
| _serviceRecords | struct ServicesRegistry.ServiceRecord[] | The service records |

### editServiceRecords

```solidity
function editServiceRecords(bytes32 _serviceId, struct ServicesRegistry.ServiceRecord[] _serviceRecords) external
```

ONLY SERVICE OWNER: Edits existing service records for an existing service. The service records must not contain duplicate record
types.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _serviceId | bytes32 | The service ID |
| _serviceRecords | struct ServicesRegistry.ServiceRecord[] | The service records |

### removeServiceRecords

```solidity
function removeServiceRecords(bytes32 _serviceId, bytes32[] _recordTypes) external
```

ONLY SERVICE OWNER: Removes existing service records for an existing service. The service records must not contain duplicate record
types.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _serviceId | bytes32 | The service ID |
| _recordTypes | bytes32[] | The record types to remove |

### setServiceOwner

```solidity
function setServiceOwner(bytes32 _serviceId, address _newOwner) external
```

ONLY SERVICE OWNER: Sets the service owner to a new address. The new address cannot be the zero address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _serviceId | bytes32 | The service ID |
| _newOwner | address | The new owner address |

### setInitialService

```solidity
function setInitialService(address _chipId, bytes32 _serviceId, uint256 _timelock) external
```

ONLY CHIP REGISTRY: Sets the initial service for a chip. The service must exist and the passed _timelock must not be 0. If the
current primaryService state is set to bytes32(0) then the chip has NOT been enrolled in a service and thus this function can be called.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip ID |
| _serviceId | bytes32 | The service ID to enroll |
| _timelock | uint256 | Timelock before which the primaryService cannot be changed |

### setNewPrimaryService

```solidity
function setNewPrimaryService(address _chipId, bytes32 _serviceId, uint256 _newTimelock, uint256 _commitBlock, bytes _signature) external
```

ONLY CHIP OWNER: Sets the primary service for the calling chip. In order for this function to succeed the following conditions
must be met:
 - The caller is the chip owner
 - The new service must exist
 - The new service must not be the same as the current primary service
 - The new timelock must be greater than the current block timestamp
 - The timelock for the previous primaryService must have expired
 - The new service must not be enrolled as a secondary service for the chip
 - The signature was generated by the chip
This function can't be called until after the chip has been claimed and enrolled in a primary service (enforced by onlyChipOwner).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | Address of chip removing secondary service |
| _serviceId | bytes32 | New primary service ID |
| _newTimelock | uint256 | Timelock for the new primary service |
| _commitBlock | uint256 | The block the signature is tied to (used to put a time limit on the signature) |
| _signature | bytes | The signature generated by the chipId (should just be a signature of the commitBlock) |

### addSecondaryService

```solidity
function addSecondaryService(address _chipId, bytes32 _serviceId, uint256 _commitBlock, bytes _signature) external
```

ONLY CHIP OWNER: Adds a secondary service for the calling chip. In order for this function to succeed the following conditions
must be met:
 - The caller is the chip owner
 - The new service must exist
 - The new service must not be enrolled as a secondary service for the chip
 - The new service must not be the same as the primary service
 - The signature was generated by the chip
This function can't be called until after the chip has been claimed and enrolled in a primary service (enforced by onlyChipOwner).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | Address of chip removing secondary service |
| _serviceId | bytes32 | The service ID |
| _commitBlock | uint256 | The block the signature is tied to (used to put a time limit on the signature) |
| _signature | bytes | The signature generated by the chipId (should just be a signature of the commitBlock) |

### removeSecondaryService

```solidity
function removeSecondaryService(address _chipId, bytes32 _serviceId, uint256 _commitBlock, bytes _signature) external
```

ONLY CHIP OWNER: Removes a secondary service for the calling chip. In order for this function to succeed the following
conditions must be met:
 - The caller is the chip owner
 - The service must exist
 - The service must be enrolled as a secondary service for the chip
 - The signature was generated by the chip
This function can't be called until after the chip has been claimed and enrolled in a primary service (enforced by onlyChipOwner).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | Address of chip removing secondary service |
| _serviceId | bytes32 | The service ID |
| _commitBlock | uint256 | The block the signature is tied to (used to put a time limit on the signature) |
| _signature | bytes | The signature generated by the chipId (should just be a signature of the commitBlock) |

### getServiceInfo

```solidity
function getServiceInfo(bytes32 _serviceId) external view returns (struct ServicesRegistry.ServiceInfo)
```

Return information about owner and record types for a service

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _serviceId | bytes32 | The service ID |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ServicesRegistry.ServiceInfo | ServiceInfo struct (owner and recordTypes) |

### getPrimaryServiceContentByRecordtype

```solidity
function getPrimaryServiceContentByRecordtype(address _chipId, bytes32 _recordType) external view returns (bytes)
```

Get the content of the given record type for a chip's primary service

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip ID |
| _recordType | bytes32 | The record type |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | bytes representing the content of the record |

### getServiceContent

```solidity
function getServiceContent(address _chipId, bytes32 _serviceId) public view returns (struct IServicesRegistry.Record[] records)
```

Get a list of all records for a given service

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address |  |
| _serviceId | bytes32 | The service ID |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| records | struct IServicesRegistry.Record[] | List of ServiceRecords for the passed serviceId |

### getAllChipServiceData

```solidity
function getAllChipServiceData(address _chipId) external view returns (struct IServicesRegistry.ExpandedChipServices)
```

Get records for every secondary service and primary service for a chip. Primary service timelock is also included
in struct.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip ID |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IServicesRegistry.ExpandedChipServices | Struct containing all records for each secondary service and primary service for the chip |

### getPrimaryServiceContent

```solidity
function getPrimaryServiceContent(address _chipId) external view returns (struct IServicesRegistry.Record[])
```

Get records for every secondary service and primary service for a chip. Primary service timelock is also included
in struct.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip ID |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IServicesRegistry.Record[] | List of ServiceRecords for the chip's primary service |

### getChipSecondaryServices

```solidity
function getChipSecondaryServices(address _chipId) public view returns (bytes32[])
```

Get list of secondary service Id's for a chip

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip ID |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32[] | List of secondary serviceIds for the chip |

### _addServiceRecord

```solidity
function _addServiceRecord(bytes32 _serviceId, struct ServicesRegistry.ServiceRecord _record) internal
```

Adds a new service record to an existing service. The service records must not contain duplicate record types or
have an existing record of the same type.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _serviceId | bytes32 | The service ID |
| _record | struct ServicesRegistry.ServiceRecord | ServiceRecord struct containing recordType, content, and appendId |

### _isService

```solidity
function _isService(bytes32 _serviceId) internal view returns (bool)
```

Checks if a service exists

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _serviceId | bytes32 | The service ID |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if service exists, false otherwise |

### _createContentString

```solidity
function _createContentString(address _chipId, bytes _content, bool _appendId) internal pure returns (bytes)
```

Build a content string based on if the chipId should be appended to the base content

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip ID |
| _content | bytes | The base content |
| _appendId | bool | Whether or not to append the chipId to the content |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | Bytestring representing the content |

