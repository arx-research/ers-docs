# Solidity API

## ChipRegistry

Entrypoint for resolving chips added to ERS. Developers can enroll new projects into this registry by specifying a
ProjectRegistrar to manage chips. Chips are added through ProjectRegistrars at which point a ERC-5791
compliant "token" of the chip is minted. Any project
integrating ERS chips should retrieve resolution information about chips from this address. Because chips are
represented as tokens, any physical chip transfers should also be completed o-chain in order to get full functionality
for the chip.

### ProjectEnrollmentAdded

```solidity
event ProjectEnrollmentAdded(address tsmRegistrar, address projectRegistrar, address transferPolicy, address projectPublicKey, bytes32 merkleRoot, string projectClaimDataUri)
```

### ChipClaimed

```solidity
event ChipClaimed(address chipId, uint256 tokenId, address owner, bytes32 serviceId, bytes32 ersNode, bytes32 enrollmentId, string tokenUri)
```

### MaxLockinPeriodUpdated

```solidity
event MaxLockinPeriodUpdated(uint256 maxLockinPeriod)
```

### RegistryInitialized

```solidity
event RegistryInitialized(address ers, address servicesRegistry, address tsmRegistry)
```

### ProjectInfo

```solidity
struct ProjectInfo {
  bytes32 merkleRoot;
  address projectPublicKey;
  contract ITransferPolicy transferPolicy;
  uint256 creationTimestamp;
  bool claimsStarted;
  string projectClaimDataUri;
}
```

### URI_RECORDTYPE

```solidity
bytes32 URI_RECORDTYPE
```

### CONTENT_APP_RECORDTYPE

```solidity
bytes32 CONTENT_APP_RECORDTYPE
```

### manufacturerRegistry

```solidity
contract IManufacturerRegistry manufacturerRegistry
```

### ers

```solidity
contract IERS ers
```

### servicesRegistry

```solidity
contract IServicesRegistry servicesRegistry
```

### tsmRegistry

```solidity
contract ITSMRegistry tsmRegistry
```

### initialized

```solidity
bool initialized
```

### projectEnrollments

```solidity
mapping(contract IProjectRegistrar => struct ChipRegistry.ProjectInfo) projectEnrollments
```

### gatewayUrls

```solidity
string[] gatewayUrls
```

### maxLockinPeriod

```solidity
uint256 maxLockinPeriod
```

### constructor

```solidity
constructor(contract IManufacturerRegistry _manufacturerRegistry, string[] _gatewayUrls, uint256 _maxBlockWindow, uint256 _maxLockinPeriod) public
```

Constructor for ChipRegistry

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _manufacturerRegistry | contract IManufacturerRegistry | Address of the ManufacturerRegistry contract |
| _gatewayUrls | string[] | Array of gateway URLs for resolving unclaimed chips using EIP-3668 |
| _maxBlockWindow | uint256 | The maximum amount of blocks a signature used for updating chip table is valid for |
| _maxLockinPeriod | uint256 | The maximum amount of time a chip can be locked into a service for beyond the project's creation timestamp |

### addProjectEnrollment

```solidity
function addProjectEnrollment(contract IProjectRegistrar _projectRegistrar, address _projectPublicKey, contract ITransferPolicy _transferPolicy, bytes32 _merkleRoot, bytes _ownershipProof, string _projectClaimDataUri) external
```

_ONLY TSM REGISTRAR: Enroll new project in ChipRegistry. This function is only callable by TSMRegistrars. In order to use
this function the project must first sign a message of the _projectRegistrar address with the _projectPublicKey's matching
private key. This key MUST be the same key used to sign all the chip certificates for the project. This creates a link between
chip certificates (which may be posted online) and the deployer of the registrar hence making sure that no malicious TSM is able
to steal another TSM's chips for their own enrollment (unless the private key happens to be leaked). This function will
revert if the project is already enrolled. See documentation for more instructions on how to create a project merkle root._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectRegistrar | contract IProjectRegistrar | Address of the ProjectRegistrar contract |
| _projectPublicKey | address | Public key of the project (used to sign chip certificates and create _signature) |
| _transferPolicy | contract ITransferPolicy | Address of the transfer policy contract governing chip transfers |
| _merkleRoot | bytes32 | Merkle root of the project's chip claims |
| _ownershipProof | bytes | Signature of the _projectRegistrar address signed by the _projectPublicKey. Proves ownership over the                                   key that signed the chip custodyProofs and tsmCertificates |
| _projectClaimDataUri | string | URI pointing to location of off-chain data required to claim chips |

### updateProjectMerkleRoot

```solidity
function updateProjectMerkleRoot(contract IProjectRegistrar _projectRegistrar, bytes32 _merkleRoot, string _projectClaimDataUri) external
```

_Update the merkle root of a project enrollment. This function is only callable by the project's public key. This function
will revert if the project has already claimed a chip from this enrollment or the 7-day update time period has elapsed. New URI
is required because IPFS records are immutable so changing the merkle root would require a new IPFS record._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectRegistrar | contract IProjectRegistrar | Address of the ProjectRegistrar contract |
| _merkleRoot | bytes32 | Merkle root of the project's chip claims |
| _projectClaimDataUri | string | URI pointing to location of off-chain data required to claim chips |

### claimChip

```solidity
function claimChip(address _chipId, struct IChipRegistry.ChipClaim _chipClaim, struct IChipRegistry.ManufacturerValidation _manufacturerValidation, bytes _tsmCertificate, bytes _custodyProof) external virtual
```

Allow a user to claim a chip from a project enrollment. Enrollment allows the chip to resolve to the project's preferred
service. Additionally, claiming creates a Physically-Bound Token representation of the chip.

_This function will revert if the chip has already been claimed, if invalid certificate data is provided or if the chip is
not part of the project enrollment (not in the project merkle root). Addtionally, there are checks to ensure that the calling
ProjectRegistrar has implemented the correct ERS logic. This function is EIP-1271 compatible and can be used to verify chip
claims tied to an account contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | Chip ID (address) |
| _chipClaim | struct IChipRegistry.ChipClaim | Struct containing information for validating merkle proof, chip owner, and chip's ERS node |
| _manufacturerValidation | struct IChipRegistry.ManufacturerValidation | Struct containing information for chip's inclusion in manufacturer's merkle tree |
| _tsmCertificate | bytes | Signature of the chipId signed by the project's public key |
| _custodyProof | bytes | Signature of the projectPublicKey signed by the chip's private key |

### transferTokenWithChip

```solidity
function transferTokenWithChip(address _chipId, address _to, bytes _payload, bytes _signature, bool _useSafeTransfer) public
```

Allow a user to transfer a chip to a new owner. Use ClaimedPBT logic which calls TransferPolicy to execute the transfer of the PBT and
chip. Update chip's ERS node in order to keep data consistency. EIP-1271 compatibility should be implemented in the chip's TransferPolicy
contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | Chip ID (address) |
| _to | address |  |
| _payload | bytes | Encoded payload containing data required to execute transfer. Data structure will be dependent on implementation of                      TransferPolicy |
| _signature | bytes | Signature of the payload signed by the chip |
| _useSafeTransfer | bool |  |

### setOwner

```solidity
function setOwner(address _chipId, address _newOwner, uint256 _commitBlock, bytes _signature) public
```

_ONLY CHIP OWNER (enforced in ClaimedPBT): Sets the owner for a chip. Chip owner must submit transaction
along with a signature from the chipId commiting to a block the signature was generated. This is to prevent
any replay attacks. If the transaction isn't submitted within the MAX_BLOCK_WINDOW from the commited block
this function will revert. Additionally, the chip's ERS node owner is updated to maintain state consistency._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chipId to set the owner for |
| _newOwner | address | The address of the new chip owner |
| _commitBlock | uint256 | The block the signature is tied to (used to put a time limit on the signature) |
| _signature | bytes | The signature generated by the chipId (should just be a signature of the commitBlock) |

### initialize

```solidity
function initialize(contract IERS _ers, contract IServicesRegistry _servicesRegistry, contract ITSMRegistry _tsmRegistry) external
```

ONLY OWNER: Initialize ChipRegistry contract with ERS and Services Registry addresses. Required due to order of operations
during deploy.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ers | contract IERS | Address of the ERS contract |
| _servicesRegistry | contract IServicesRegistry | Address of the ServicesRegistry contract |
| _tsmRegistry | contract ITSMRegistry | Address of the TSMRegistry contract |

### addGatewayURL

```solidity
function addGatewayURL(string _gatewayUrl) external
```

ONLY OWNER: Add a new gateway URL to the array of gateway URLs. This array returns different URLs the client can call to
get the data to resolve an unclaimed chip. The client can then use the data returned from the URL to call resolveUnclaimedChip.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _gatewayUrl | string | The URL to add to the array of gateway URLs |

### removeGatewayURL

```solidity
function removeGatewayURL(string _gatewayUrl) external
```

ONLY OWNER: Remove a gateway URL from the array of gateway URLs. This array returns different URLs the client can call to
get the data to resolve an unclaimed chip. The client can then use the data returned from the URL to call resolveUnclaimedChip.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _gatewayUrl | string | The URL to remove from the array of gateway URLs |

### updateMaxLockinPeriod

```solidity
function updateMaxLockinPeriod(uint256 _maxLockinPeriod) external
```

ONLY OWNER: Update the maximum amount of time a chip can be locked into a service for beyond the project's creation timestamp

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _maxLockinPeriod | uint256 | The new maximum amount of time a chip can be locked into a service for beyond the project's creation timestamp |

### resolveChipId

```solidity
function resolveChipId(address _chipId) external view returns (struct IServicesRegistry.Record[])
```

Resolve chip following EIP-3668 conventions. If the chip has been claimed, return the primary service content.
If the chip hasn't been claimed then revert with an OffchainLookup error (per EIP-3668). The client can read the error
and use the contents to find the required information to submit to the resolveUnclaimedChip function. This function will
then return the either a bootloader app or content associated with the chip depending on if it has been included in a
project enrollment.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | The chip public key |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IServicesRegistry.Record[] | The content associated with the chip (if chip has been claimed already) |

### resolveUnclaimedChip

```solidity
function resolveUnclaimedChip(bytes _response, bytes _extraData) external view returns (struct IServicesRegistry.Record[])
```

Callback function for resolving unclaimed chip following EIP-3668 conventions. If the chip has been enrolled in
a project and has valid certificates then return the claim app for that project. Otherwise, get the bootloader app associated
 with the chip from the ManufacturerRegistry and return that. The _response parameter is structured in the following way:
| tsmEntries (uint256) | data (bytes) | where data is structured as follows:
| [tsmEntry[0],..., tsmEntry[n], manufacturerValidation] | where tsmEntry is structured as follows:
| enrollmentId (bytes32) | projectRegistrar (address) | TSMMerkleInfo | tsmCertificate | custodyProof

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _response | bytes | The response from the offchain lookup |
| _extraData | bytes | Extra data required to resolve the unclaimed chip |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct IServicesRegistry.Record[] | The bootloader app or content associated with the chip |

### tokenURI

```solidity
function tokenURI(uint256 _tokenId) public view returns (string)
```

Get tokenUri from tokenId. TokenURI associated with primary service takes precedence, if no tokenURI as
part of primary service then fail over to tokenURI defined in ClaimedPBT.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint256 | Chip's tokenId |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | TokenUri |

### tokenURI

```solidity
function tokenURI(address _chipId) public view returns (string)
```

Get tokenUri from chip address. TokenURI associated with primary service takes precedence, if no tokenURI as
part of primary service then fail over to tokenURI defined in ClaimedPBT.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | Chip's address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | TokenUri |

### getGatewayUrls

```solidity
function getGatewayUrls() external view returns (string[])
```

### _setERSOwnerForChip

```solidity
function _setERSOwnerForChip(address _chipId, address _newOwner) internal
```

Get ERS node from tokenData and then sets the new Owner of the chip on the ERSRegistry.

### _validateCertificates

```solidity
function _validateCertificates(address _chipId, address _projectPublicKey, bytes _tsmCertificate, bytes _custodyProof) internal view
```

Check that certificates passed as part of claim are valid. TSM cert is valid if the project public key signed
the address of the chip. We then check the validity of the signed certificate which is the project public key
signed by the chip.

### _areValidCertificates

```solidity
function _areValidCertificates(address _chipId, address _projectPublicKey, bytes _tsmCertificate, bytes _custodyProof) internal view returns (bool, string)
```

Check that certificates passed as part of claim are valid. TSM cert is valid if the project public key signed
the address of the chip. We then check the validity of the signed certificate which is the project public key
signed by the chip. If one of the certificates is invalid we return false and bubble up the error message.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool    Whether or not the certificates are valid |
| [1] | string | string  Error message if certificates are invalid |

### _validateManufacturerMerkleProof

```solidity
function _validateManufacturerMerkleProof(address chipId, struct IChipRegistry.ManufacturerValidation _manufacturerValidation) internal view
```

Validate inclusion in Manufacturer's chip enrollment

### _isValidTSMMerkleProof

```solidity
function _isValidTSMMerkleProof(address _chipId, struct IChipRegistry.TSMMerkleInfo _merkleProofInfo, bytes32 _enrollmentId, bytes32 _merkleRoot) internal pure returns (bool)
```

Indicate inclusion in TSM's merkle tree

### _validateTSMMerkleProof

```solidity
function _validateTSMMerkleProof(address _chipId, struct IChipRegistry.TSMMerkleInfo _merkleProofInfo, bytes32 _enrollmentId, bytes32 _merkleRoot) internal pure
```

Validate inclusion in TSM's merkle tree

### _getChipPrimaryServiceContentByRecordType

```solidity
function _getChipPrimaryServiceContentByRecordType(address _chipId, bytes32 _recordType) internal view returns (string)
```

Grab passed record type of primary service. For purposes of use within this contract we convert bytes
to string

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chipId | address | Chip's address |
| _recordType | bytes32 | Bytes32 hash representing the record type being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | Content cotained in _recordType |

### _encodeTokenData

```solidity
function _encodeTokenData(bytes32 _ersNode, bytes32 _enrollmentId) internal pure returns (bytes)
```

ClaimedPBT has an unstructured "tokenData" field that for our implementation we will populate with the chip's
ERS node and the manufacturer enrollmentId of the chip. This function structures that data.

### _decodeTokenData

```solidity
function _decodeTokenData(bytes _tokenData) internal pure returns (bytes32, bytes32)
```

ClaimedPBT has an unstructured "tokenData" field that for our implementation we will populate with the chip's
ERS node and the manufacturer enrollmentId of the chip. This function interprets that data.

