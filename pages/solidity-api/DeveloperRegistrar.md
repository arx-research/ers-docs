# Solidity API

## DeveloperRegistrar

Contract that coordinates adding a new project for a Developer. Each Developer has their own DeveloperRegistrar which is associated
with a .ers subnode in the ERS registry ([developer].ers). When adding a new project, a subnode under the developer.ers sub-
domain is added ([projectName].developer.ers) and the project is enrolled in the ChipRegistry.

### ProjectAdded

```solidity
event ProjectAdded(address indexed projectRegistrar, bytes32 projectRootNode)
```

### ProjectRemoved

```solidity
event ProjectRemoved(address indexed projectRegistrar)
```

### RegistrarInitialized

```solidity
event RegistrarInitialized(bytes32 rootNode)
```

### chipRegistry

```solidity
IChipRegistry public immutable chipRegistry
```

### ers

```solidity
IERS public immutable ers
```

### developerRegistry

```solidity
IDeveloperRegistry public immutable developerRegistry
```

### servicesRegistry

```solidity
IServicesRegistry public immutable servicesRegistry
```

### initialized

```solidity
bool public initialized
```

### rootNode

```solidity
bytes32 public rootNode
```

### projects

```solidity
address[] public projects
```

### projectIndex

```solidity
mapping(address => uint256) internal projectIndex
```

### constructor

```solidity
constructor(IChipRegistry _chipRegistry, IERS _ers, IDeveloperRegistry _developerRegistry, IServicesRegistry _servicesRegistry) public
```

Constructor for DeveloperRegistrar. Sets the owner and ChipRegistry.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipRegistry | contract IChipRegistry | ChipRegistry contract |
| _ers | contract IERS | ERS registry |
| _developerRegistry | contract IDeveloperRegistry | DeveloperRegistry contract |
| _servicesRegistry | contract IServicesRegistry | ServicesRegistry contract |

### initialize

```solidity
function initialize(address _owner, bytes32 _rootNode) external
```

ONLY Developer REGISTRY: Initialize DeveloperRegistrar contract with root node. Required due to order of operations
during deploy.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | Owner of the DeveloperRegistrar |
| _rootNode | bytes32 | Root node of the Developer |

### addProject

```solidity
function addProject(IProjectRegistrar _projectRegistrar, bytes32 _nameHash, bytes32 _serviceId, uint256 _lockinPeriod) external
```

ONLY OWNER: Add a new project to the Developer. Creates a new subnode in the ENS registry and adds the project
to the ChipRegistry.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectRegistrar | contract IProjectRegistrar | ProjectRegistrar contract |
| _nameHash | bytes32 | Namehash of the project |
| _serviceId | bytes32 | Service ID of the project |
| _lockinPeriod | uint256 | Lockin period of the project |

### removeProject

```solidity
function removeProject(IProjectRegistrar _projectRegistrar) external
```

ONLY OWNER: Remove a project from the Developer. Removes the project from the ChipRegistry.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectRegistrar | contract IProjectRegistrar | ProjectRegistrar contract |

### getProjects

```solidity
function getProjects() external view returns(address[] memory)
```
