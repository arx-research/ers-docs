# Solidity API

## DeveloperNameGovernor

Contract that coordinates adding a new project for a Developer. Each Developer has their own DeveloperRegistrar which is associated
with a .ers subnode in the ERS registry ([developer].ers). In order for a valid name claim the caller must submit a transaction with a valid
signature signed by the coordinator of this contract over hash(developerAddress, developerName).

### NameCoordinatorUpdated

```solidity
event NameCoordinatorUpdated(address newNameCoordinator)
```

### nameCoordinator

```solidity
address public nameCoordinator
```

### developerRegistry

```solidity
contract IDeveloperRegistry public developerRegistry
```

### constructor

```solidity
constructor(contract IDeveloperRegistry _developerRegistry, address _nameCoordinator) public
```

### createNewDeveloperRegistrar

```solidity
function createNewDeveloperRegistrar(address _developerRegistrarFactory, bytes32 nameHash, address signature) external
```

Creates a new developer registrar with governance approval.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _developerRegistrarFactory | address | The factory to deploy the registrar through |
| nameHash | bytes32 | The hash of the developer name |
| signature | address | The governance signature approving the name |

### updateNameCoordinator

```solidity
function updateNameCoordinator(address _nameCoordinator) external
```

Updates the name coordinator address (owner only).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _nameCoordinator | address | The new name coordinator address |