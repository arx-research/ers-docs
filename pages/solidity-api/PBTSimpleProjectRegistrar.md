2 # Solidity API
2 
2 ## PBTSimpleProjectRegistrar
2 
2 Base contract for ProjectRegistrars. Contains common functionality for all ProjectRegistrars including setting the root node
2 and claiming chips.
2 
2 ### ProjectChipAddition
2 
2 ```solidity
2 struct ProjectChipAddition {
2   address chipId;
2   address chipOwner;
2   bytes32 nameHash;
2   IChipRegistry.ManufacturerValidation manufacturerValidation;
2   bytes custodyProof;
2 }
2 ```
2 
2 ### Constructor
2 
2 ```solidity
2 constructor(
2   IChipRegistry _chipRegistry, 
2   IERS _ers, 
2   IDeveloperRegistrar _developerRegistrar,
2   string memory _name,
2   string memory _symbol,
2   string memory _baseURI,
2   uint256 _maxBlockWindow,
2   ITransferPolicy _transferPolicy
2 )
2 ```
2 
2 Constructor for `PBTSimpleProjectRegistrar`.
2 
2 #### Parameters
2 
2 | Name | Type | Description |
2 | ---- | ---- | ----------- |
2 | _chipRegistry | IChipRegistry | The chip registry of the ERS system being used |
2 | _ers | IERS | The ERS registry of the ERS system being used |
2 | _developerRegistrar | IDeveloperRegistrar | The DeveloperRegistrar that made this project |
2 | _name | string | The name of the custom PBT token |
2 | _symbol | string | The symbol of the custom PBT token |
2 | _baseURI | string | The base URI for the PBT tokens |
2 | _maxBlockWindow | uint256 | Maximum block window for transfers |
2 | _transferPolicy | ITransferPolicy | The transfer policy used by the project |
2 
2 ### setTransferPolicy
2 
2 ```solidity
2 function setTransferPolicy(ITransferPolicy _newPolicy) public onlyOwner()
2 ```
2 
2 Owner sets the transfer policy for PBT.
2 
2 #### Parameters
2 
2 | Name | Type | Description |
2 | ---- | ---- | ----------- |
2 | _newPolicy | ITransferPolicy | The address of the new transfer policy. Zero address disables transfers. |
2 
2 ### setBaseURI
2 
2 ```solidity
2 function setBaseURI(string memory updatedBaseURI) public onlyOwner()
2 ```
2 
2 ONLY OWNER: Allows the contract owner to update the base URI for the PBT tokens.
2 
2 #### Parameters
2 
2 | Name | Type | Description |
2 | ---- | ---- | ----------- |
2 | updatedBaseURI | string | The new base URI to set for the tokens |
2 
2 ### transferToken
2 
2 ```solidity
2 function transferToken(
2   address to,
2   address chipId,
2   bytes calldata signatureFromChip,
2   uint256 blockNumberUsedInSig,
2   bool useSafeTransferFrom,
2   bytes calldata payload
2 ) public override(PBTSimple) returns (uint256 tokenId)
2 ```
2 
2 Allow a user to transfer a chip to a new owner. New owner must submit the transaction. Uses ChipPBT logic, which calls
2 TransferPolicy to execute the transfer of the PBT and chip, updating the chip's ERS node to keep data consistency.
2 
2 #### Parameters
2 
2 | Name | Type | Description |
2 | ---- | ---- | ----------- |
2 | to | address | The address of the new chip owner |
2 | chipId | address | Chip ID (address) of chip being transferred |
2 | signatureFromChip | bytes | Signature from the chip being transferred |
2 | blockNumberUsedInSig | uint256 | Block number used in the signature |
2 | useSafeTransferFrom | bool | Indicates whether to use `safeTransferFrom` or `transferFrom` |
2 | payload | bytes | Encoded payload containing additional data required for the transfer |
2 
2 #### Return Values
2 
2 | Name | Type | Description |
2 | ---- | ---- | ----------- |
2 | tokenId | uint256 | The token ID of the transferred chip |
2 
2 ### addChips
2 
2 ```solidity
2 function addChips(ProjectChipAddition[] calldata _chips) external onlyOwner()
2 ```
2 
2 ONLY OWNER: Allows the project manager to add chips to the project.
2 
2 #### Parameters
2 
2 | Name | Type | Description |
2 | ---- | ---- | ----------- |
2 | _chips | ProjectChipAddition[] | Array of chip information required for claiming chips |
2 
2 ### supportsInterface
2 
2 ```solidity
2 function supportsInterface(bytes4 _interfaceId) public view override(BaseProjectRegistrar, PBTSimple) returns (bool)
2 ```
2 
2 Returns true if the contract supports the given interface ID.
2 
2 #### Parameters
2 
2 | Name | Type | Description |
2 | ---- | ---- | ----------- |
2 | _interfaceId | bytes4 | The interface ID to check for |
2 
2 #### Return Values
2 
2 | Name | Type | Description |
2 | ---- | ---- | ----------- |
2 | [0] | bool | True if the contract supports the given interface ID |
