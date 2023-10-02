# Solidity API

## ERSRegistry

Fork of ENSRegistry with adapted data structures and accessiblity logic in order to conform to needs of ERS. Node
owners can create any subnode. A node tracks the owner of the node and the address the node resolves to. Within the
context of ERS a resolver represents either a smart contract OR a chip. The owner has the ability to create any subnodes
of its choosing, however only the TSMRegistry is able to change both the owner and the resolver for a given node once
created. The ChipRegistry is able to change the owner of a node (signifying a transfer of a chip) but is not able to 
change the resolver. These permissions are put in place in order to maintain a track record of authenticity for chips
while allowing the TSMRegistry to re-assign sub-domains to new TSMRegistrars. Note that if a TSMRegistry's subnode is
reassigned to a new TSMRegistrar the new TSMRegistrar CANNOT overwrite the nodes created by the previous node owner.

### NewOwner

```solidity
event NewOwner(bytes32 node, bytes32 subnode, bytes32 nameHash, address owner)
```

### Transfer

```solidity
event Transfer(bytes32 node, address owner)
```

### NewResolver

```solidity
event NewResolver(bytes32 node, address resolver)
```

### Record

```solidity
struct Record {
  address owner;
  address resolver;
}
```

### authorised

```solidity
modifier authorised(bytes32 _node)
```

### chipRegistry

```solidity
contract IChipRegistry chipRegistry
```

### tsmRegistry

```solidity
contract ITSMRegistry tsmRegistry
```

### records

```solidity
mapping(bytes32 => struct ERSRegistry.Record) records
```

### constructor

```solidity
constructor(contract IChipRegistry _chipRegistry, contract ITSMRegistry _tsmRegistry) public
```

_Constructs a new ERS registry._

### createSubnodeRecord

```solidity
function createSubnodeRecord(bytes32 _node, bytes32 _nameHash, address _owner, address _resolver) external virtual returns (bytes32)
```

_Sets the record for a new subnode. May only be called by owner of node (checked in _setSubnodeOwner)._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _node | bytes32 | The parent node. |
| _nameHash | bytes32 | The hash of the nameHash specifying the subnode. |
| _owner | address | The address of the new owner. |
| _resolver | address | The address of the resolver. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | The newly created subnode hash |

### deleteSubnodeRecord

```solidity
function deleteSubnodeRecord(bytes32 _node, bytes32 _nameHash) external virtual
```

_ONLY TSM REGISTRY: Deletes the record for an already created subnode. TSM Registry must be the owner of the node so as to not
accidentally delete a non TSMRegistrar subnode._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _node | bytes32 | The parent node. |
| _nameHash | bytes32 | The hash of the nameHash specifying the subnode. |

### setNodeOwner

```solidity
function setNodeOwner(bytes32 _node, address _newOwner) external virtual
```

_ONLY CHIP REGISTRY: Transfers ownership of a node to a new address. Owner cannot directly call (unless root node),
ChipRegistry must manage ownership changes for chips in order to keep state consistent between ChipRegistry and ERS._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _node | bytes32 | The node to transfer ownership of. |
| _newOwner | address | The address of the new owner. |

### isValidChipState

```solidity
function isValidChipState(bytes32 _node, address _chipId, address _owner) external view virtual returns (bool)
```

_Validate that state has been correctly set for a chip. Used by ChipRegistry to validate that a ProjectRegistrar has
set the correct state for a chip._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _node | bytes32 | The specified node. |
| _chipId | address | The specified chipId. |
| _owner | address | The specified owner. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool indicating whether state is valid |

### getOwner

```solidity
function getOwner(bytes32 _node) public view virtual returns (address)
```

_Returns the address that owns the specified node._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _node | bytes32 | The specified node. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address of the owner. |

### getSubnodeOwner

```solidity
function getSubnodeOwner(bytes32 _node, bytes32 _nameHash) external view virtual returns (address)
```

_Returns the address that owns the specified subnode._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _node | bytes32 | The specified node. |
| _nameHash | bytes32 | The specified nameHash. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address of the owner. |

### getResolver

```solidity
function getResolver(bytes32 _node) external view virtual returns (address)
```

_Returns the address of the resolver for the specified node._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _node | bytes32 | The specified node. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address of the resolver. |

### recordExists

```solidity
function recordExists(bytes32 _node) public view virtual returns (bool)
```

_Returns whether a record has been written to the registry for that node._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _node | bytes32 | The specified node. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Bool if record exists |

### getSubnodeHash

```solidity
function getSubnodeHash(bytes32 _node, bytes32 _nameHash) external pure returns (bytes32)
```

_Returns the subnode hash of node + nameHash. This is the keccak256 hash of `node` + `nameHash`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _node | bytes32 | The specified node. |
| _nameHash | bytes32 | The specified nameHash. |

### _calculateSubnode

```solidity
function _calculateSubnode(bytes32 _node, bytes32 _nameHash) internal pure returns (bytes32)
```

### _setOwner

```solidity
function _setOwner(bytes32 node, address owner) internal virtual
```

### _setResolver

```solidity
function _setResolver(bytes32 _node, address _resolver) internal virtual
```

