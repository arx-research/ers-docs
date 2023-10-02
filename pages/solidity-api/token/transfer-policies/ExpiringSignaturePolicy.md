# Solidity API

## ExpiringSignaturePolicy

### constructor

```solidity
constructor() public
```

### authorizeTransfer

```solidity
function authorizeTransfer(address, address, address, address, bytes _payload, bytes) external view
```

_Authorize transfer of chip by checking that the signature has not expired. Signature validation
checks are done by the ClaimedPBT contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
|  | address |  |
|  | address |  |
|  | address |  |
|  | address |  |
| _payload | bytes | Payload containing transfer data (to, expiration block) |
|  | bytes |  |

