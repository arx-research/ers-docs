# Solidity API

## TSMRegistrarFactory

Contract used to deploy new TSMRegistrars. Callable only by the TSMRegistry.

### TSMRegistrarDeployed

```solidity
event TSMRegistrarDeployed(address tsmRegistrar, address owner)
```

### chipRegistry

```solidity
contract IChipRegistry chipRegistry
```

### ers

```solidity
contract IERS ers
```

### tsmRegistry

```solidity
contract ITSMRegistry tsmRegistry
```

### constructor

```solidity
constructor(contract IChipRegistry _chipRegistry, contract IERS _ers, contract ITSMRegistry _tsmRegistry) public
```

### deployRegistrar

```solidity
function deployRegistrar(address _owner) external returns (address)
```

