# Solidity API

## TSMRegistrar

Contract that coordinates adding a new project for a TSM. Each TSM has their own TSMRegistrar which is associated
with a .ers subnode in the ERS registry ([tsm].ers). When adding a new project a subnode under the tsm.ers sub-
domain is added ([projectName].tsm.ers) and the project is enrolled in the ChipRegistry.

### ProjectAdded

```solidity
event ProjectAdded(address projectRegistrar, bytes32 projectRootNode, bytes32 merkleRoot, address projectPublicKey, address transferPolicy, string projectClaimDataUri)
```

### RegistrarInitialized

```solidity
event RegistrarInitialized(bytes32 rootNode)
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

### initialized

```solidity
bool initialized
```

### rootNode

```solidity
bytes32 rootNode
```

### projects

```solidity
address[] projects
```

### constructor

```solidity
constructor(address _owner, contract IChipRegistry _chipRegistry, contract IERS _ers, contract ITSMRegistry _tsmRegistry) public
```

Constructor for TSMRegistrar. Sets the owner and ChipRegistry.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | Owner of the TSMRegistrar. This address is responsible for adding new projects |
| _chipRegistry | contract IChipRegistry | ChipRegistry contract |
| _ers | contract IERS | ERS registry |
| _tsmRegistry | contract ITSMRegistry | TSMRegistry contract |

### initialize

```solidity
function initialize(bytes32 _rootNode) external
```

ONLY TSM REGISTRY: Initialize TSMRegistrar contract with root node. Required due to order of operations
during deploy.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rootNode | bytes32 | Root node of the TSM |

### addProject

```solidity
function addProject(bytes32 _nameHash, contract IProjectRegistrar _projectRegistrar, bytes32 _merkleRoot, address _projectPublicKey, contract ITransferPolicy _transferPolicy, bytes _ownershipProof, string _projectClaimDataUri) external
```

ONLY OWNER: Add a new project to the TSM. Creates a new subnode in the ENS registry and adds the project
to the ChipRegistry. TSMRegistrar's DO NOT have the ability to overwrite their subnodes in ERS, hence if a _nameHash
is already taken, this function will revert. Ownership proof is checked in the ChipRegistry.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _nameHash | bytes32 | Namehash of the project |
| _projectRegistrar | contract IProjectRegistrar | ProjectRegistrar contract |
| _merkleRoot | bytes32 | Merkle root of the project's chip ownership |
| _projectPublicKey | address | Public key of the project |
| _transferPolicy | contract ITransferPolicy | Transfer policy of the project |
| _ownershipProof | bytes | Signed hash of the _projectRegistrar address by the _projectPublicKey |
| _projectClaimDataUri | string | URI pointing to location of off-chain data required to claim chips |

### getProjects

```solidity
function getProjects() external view returns (address[])
```

