# Solidity API

## ERC721ReadOnly

An implementation of 721 that's publicly readonly (no approvals or transfers exposed).

### constructor

```solidity
constructor(string name_, string symbol_) public
```

### approve

```solidity
function approve(address, uint256) public virtual
```

### getApproved

```solidity
function getApproved(uint256 tokenId) public view virtual returns (address)
```

_See {IERC721-getApproved}._

### setApprovalForAll

```solidity
function setApprovalForAll(address, bool) public virtual
```

### isApprovedForAll

```solidity
function isApprovedForAll(address, address) public view virtual returns (bool)
```

### transferFrom

```solidity
function transferFrom(address, address, uint256) public virtual
```

### safeTransferFrom

```solidity
function safeTransferFrom(address, address, uint256) public virtual
```

### safeTransferFrom

```solidity
function safeTransferFrom(address, address, uint256, bytes) public virtual
```

