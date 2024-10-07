# Solidity API

## DeveloperRegistrarFactory

Contract used to deploy new DeveloperRegistrars. Callable only by the DeveloperRegistry.

### DeveloperRegistrarDeployed

```solidity
event DeveloperRegistrarDeployed(address indexed developerRegistrar)
```

### developerRegistrar

```solidity
address public immutable developerRegistrar
```

### developerRegistry

```solidity
IDeveloperRegistry public immutable developerRegistry
```

### constructor

```solidity
constructor(address _developerRegistrar, IDeveloperRegistry _developerRegistry) public
```

Constructor for DeveloperRegistrarFactory.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _developerRegistrar | address | Address of the DeveloperRegistrar to clone |
| _developerRegistry | contract IDeveloperRegistry | DeveloperRegistry contract |

### deployDeveloperRegistrar

```solidity
function deployDeveloperRegistrar() external returns (address)
```

ONLY DeveloperRegistry: Deploy a new DeveloperRegistrar contract.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The address of the newly deployed DeveloperRegistrar |
