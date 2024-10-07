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
 - The signature was generated by
