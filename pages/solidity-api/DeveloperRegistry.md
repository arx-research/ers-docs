# Solidity API

## DeveloperRegistry

Contract responsible for tracking and permissioning Developers. Developers are given the ability to create a new DeveloperRegistrar by
governance. When creating a new Registrar, the Developer is given a new [x].ers name. Governance has the ability to revoke Developer permissions
and reassign the ERS name to a new Developer.

### DeveloperRegistrarAdded

```solidity
event DeveloperRegistrarAdded(address indexed developerRegistrar, address indexed owner, bytes32 rootNode)
```

### DeveloperRegistrarRevoked

```solidity
event DeveloperRegistrarRevoked(address indexed developerRegistrar, bytes32 subnode, bytes32 _nameHash)
```

### DeveloperAllowed

```solidity
event DeveloperAllowed(address indexed developerOwner, bytes32 nameHash)
```

### DeveloperDisallowed

```solidity
event DeveloperDisallowed(address indexed developerOwner)
```

### RegistrarFactoryAdded

```solidity
event RegistrarFactoryAdded(address indexed factory)
```

### RegistrarFactoryRemoved

```solidity
event RegistrarFactoryRemoved(address indexed factory)
```

### RegistryInitialized

```solidity
event RegistryInitialized(address ers)
```

### ROOT_NODE

```solidity
bytes32 public constant ROOT_NODE
```

### ersRegistry

```solidity
IERS public ersRegistry
```

### initialized

```solidity
bool public initialized
```

### nameGovernor

```solidity
address public nameGovernor
```

### registrarFactories

```solidity
mapping(IDeveloperRegistrarFactory => bool) public registrarFactories
```

### pendingDevelopers

```solidity
mapping(address => bytes32) public pendingDevelopers
```

### isDeveloperRegistrar

```solidity
mapping(address => bool) public isDeveloperRegistrar
```

### developerRegistrars

```solidity
address[] internal developerRegistrars
```

### constructor

```solidity
constructor(address _governance) public
```

### initialize

```solidity
function initialize(IERS _ers, IDeveloperRegistrarFactory[] calldata _factories, address _nameGovernor) external
```

ONLY OWNER: Initialize DeveloperRegistry contract with ERS and Services Registry addresses. Required due to order of operations during deploy.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ers | contract IERS | Address of the ERS contract |
| _factories | contract IDeveloperRegistrarFactory[] | Array of DeveloperRegistrarFactory contracts |
| _nameGovernor | address | Address of the Name Governor which can assign names to Developers |

### createNewDeveloperRegistrar

```solidity
function createNewDeveloperRegistrar(IDeveloperRegistrarFactory _factory) external returns(address)
```

Create a new DeveloperRegistrar for a Developer. In order to call, the calling address must be approved by governance.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _factory | contract IDeveloperRegistrarFactory | Address of the DeveloperRegistrarFactory to use for deploying the DeveloperRegistrar |

### revokeDeveloperRegistrar

```solidity
function revokeDeveloperRegistrar(address _developerRegistrar, bytes32 _nameHash) external
```

ONLY OWNER: Revoke permissions from a DeveloperRegistrar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _developerRegistrar | address | Address of the DeveloperRegistrar that is being revoked |
| _nameHash | bytes32 | Bytes32 hash of the ERS name the Developer wants for their Registrar |

### addAllowedDeveloper

```solidity
function addAllowedDeveloper(address _developerOwner, bytes32 _nameHash) external
```

ONLY OWNER: Add a new address that can create a new DeveloperRegistrar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _developerOwner | address | Address that has the ability to create a new DeveloperRegistrar |
| _nameHash | bytes32 | Bytes32 hash of the ERS name the Developer wants for their Registrar |

### removeAllowedDeveloper

```solidity
function removeAllowedDeveloper(address _developerOwner) external
```

ONLY OWNER: Remove an address from creating a new DeveloperRegistrar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _developerOwner | address | Address that has the ability to create a new DeveloperRegistrar |

### addRegistrarFactory

```solidity
function addRegistrarFactory(IDeveloperRegistrarFactory _factory) external
```

ONLY OWNER: Add a new DeveloperRegistrarFactory that can be used for creating new DeveloperRegistrars.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _factory | contract IDeveloperRegistrarFactory | Address of DeveloperRegistrarFactory to add |

### removeRegistrarFactory

```solidity
function removeRegistrarFactory(IDeveloperRegistrarFactory _factory) external
```

ONLY OWNER: Remove a DeveloperRegistrarFactory.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _factory | contract IDeveloperRegistrarFactory | Address of DeveloperRegistrarFactory to remove |

### getDeveloperRegistrars

```solidity
function getDeveloperRegistrars() external view returns(address[] memory)
```

### _addRegistrarFactory

```solidity
function _addRegistrarFactory(IDeveloperRegistrarFactory _factory) internal
```
