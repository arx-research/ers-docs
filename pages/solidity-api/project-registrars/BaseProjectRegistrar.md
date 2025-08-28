# Solidity API

## BaseProjectRegistrar

Base contract for ProjectRegistrars. Contains common functionality for all ProjectRegistrars including setting the root node
and claiming chips.

### RootNodeSet

```solidity
event RootNodeSet(bytes32 _rootNode)
```

### chipRegistry

```solidity
contract IChipRegistry public chipRegistry
```

### ers

```solidity
contract IERS public ers
```

### developerRegistrar

```solidity
contract IDeveloperRegistrar public developerRegistrar
```

### rootNode

```solidity
bytes32 public rootNode
```

It is the hash(hash(projectName), node(developer.ers))

### constructor

```solidity
constructor(contract IChipRegistry _chipRegistry, contract IERS _ers, contract IDeveloperRegistrar _developerRegistrar, string _name, string _symbol, string _tokenUriRoot, uint256 _lockinPeriod, contract ITransferPolicy _transferPolicy) public
```

### setRootNode

```solidity
function setRootNode(bytes32 _rootNode) external
```

Sets the root node for the project (can only be called by DeveloperRegistrar).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rootNode | bytes32 | The root node hash |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

See {IERC165-supportsInterface}.