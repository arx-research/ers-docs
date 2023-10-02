# Solidity API

## TSMRegistry

Contract responsible for tracking and permissioning TSMs. TSMs are given the ability to create a new TSMRegistrar by governance.
When creating a new Registrar the TSM is given a new [x].ers name. Governance has the ability to revoke TSM permissions and re-
assign the ERS name to a new TSM.

### TSMRegistrarAdded

```solidity
event TSMRegistrarAdded(address tsmRegistrar, address owner, bytes32 rootNode)
```

### TSMRegistrarRevoked

```solidity
event TSMRegistrarRevoked(address tsmRegistrar, bytes32 subnode, bytes32 _nameHash)
```

### TSMAllowed

```solidity
event TSMAllowed(address tsmOwner, bytes32 nameHash)
```

### TSMDisallowed

```solidity
event TSMDisallowed(address tsmOwner)
```

### RegistrarFactoryAdded

```solidity
event RegistrarFactoryAdded(address factory)
```

### RegistrarFactoryRemoved

```solidity
event RegistrarFactoryRemoved(address factory)
```

### RegistryInitialized

```solidity
event RegistryInitialized(address ers)
```

### ROOT_NODE

```solidity
bytes32 ROOT_NODE
```

### ersRegistry

```solidity
contract IERS ersRegistry
```

### initialized

```solidity
bool initialized
```

### registrarFactories

```solidity
mapping(contract ITSMRegistrarFactory => bool) registrarFactories
```

### pendingTSMs

```solidity
mapping(address => bytes32) pendingTSMs
```

### isTSMRegistrar

```solidity
mapping(address => bool) isTSMRegistrar
```

### tsmRegistrars

```solidity
address[] tsmRegistrars
```

### constructor

```solidity
constructor(address _governance) public
```

### initialize

```solidity
function initialize(contract IERS _ers, contract ITSMRegistrarFactory[] _factories) external
```

ONLY OWNER: Initialize ChipRegistry contract with ERS and Services Registry addresses. Required due to order of operations
during deploy.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ers | contract IERS | Address of the ERS contract |
| _factories | contract ITSMRegistrarFactory[] | Array of TSMRegistrarFactory contracts |

### createNewTSMRegistrar

```solidity
function createNewTSMRegistrar(contract ITSMRegistrarFactory _factory) external returns (address)
```

Create a new TSMRegistrar for a TSM. In order to call, the calling address must be approved by governance. Once called the TSM
must be added again if they want to launch a new TSMRegistrar. This function assigns the TSMRegistrar it's own .ers name. The passed
nameHash must be different than any other TSMRegistrar's nameHash.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _factory | contract ITSMRegistrarFactory | Address of the TSMRegistrarFactory to use for deploying the TSMRegistrar |

### revokeTSMRegistrar

```solidity
function revokeTSMRegistrar(address _tsmRegistrar, bytes32 _nameHash) external
```

ONLY OWNER: Revoke permissions from a TSMRegistrar. This resets the owner and resolver to the zero address in the ERSRegistry
and removes tracking of the TSMRegistrar within the TSMRegistry (delete from tsmRegistrars array and isTSMRegistrar mapping).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tsmRegistrar | address | Address of the TSMRegistrar that is being revoked |
| _nameHash | bytes32 | Bytes32 hash of the ERS name the TSM wants for their Registrar |

### addAllowedTSM

```solidity
function addAllowedTSM(address _tsmOwner, bytes32 _nameHash) external
```

ONLY OWNER: Add a new address that can create a new TSMRegistrar. Since ERS names have value we want them to commit to a name
up front. The passed nameHash must be different than any other TSMRegistrar's nameHash and not bytes32(0).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tsmOwner | address | Address that has the ability to create a new TSMRegistrar with the below nameHash |
| _nameHash | bytes32 | Bytes32 hash of the ERS name the TSM wants for their Registrar |

### removeAllowedTSM

```solidity
function removeAllowedTSM(address _tsmOwner) external
```

ONLY OWNER: Remove an address from creating a new TSMRegistrar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tsmOwner | address | Address that has the ability to create a new TSMRegistrar with the below nameHash |

### addRegistrarFactory

```solidity
function addRegistrarFactory(contract ITSMRegistrarFactory _factory) external
```

ONLY OWNER: Add a new TSMRegistrarFactory that can be used for creating new TSMRegistrars.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _factory | contract ITSMRegistrarFactory | Address of TSMRegistrarFactory to add |

### removeRegistrarFactory

```solidity
function removeRegistrarFactory(contract ITSMRegistrarFactory _factory) external
```

ONLY OWNER: Remove a TSMRegistrarFactory so that it can't be used for creating new TSMRegistrars.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _factory | contract ITSMRegistrarFactory | Address of TSMRegistrarFactory to add |

### getTSMRegistrars

```solidity
function getTSMRegistrars() external view returns (address[])
```

### _addRegistrarFactory

```solidity
function _addRegistrarFactory(contract ITSMRegistrarFactory _factory) internal
```

