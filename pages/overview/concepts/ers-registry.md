# What is the ERS Registry?
The ERS Registry is a modified fork of the ENS Registry used to manage ERS names. ERS names provide a way to track the chain of custody of chips from manufacturer to Developer to Project to end-user, in this way the ERSRegistry contract acts as an easy way to validate the authenticity of items that contain embedded chips enrolled in the ERS system.

Each name is associated with a `Record` that points towards an `owner` and `resolver` address. The `owner` address is the address that can add subdomains to a given name. In some instances the `owner` is also allowed to set a new `owner` of the `Record`. However, once set the `resolver` parameter of a `Record` cannot be updated, it is forever tied to the address / chip that was specified upon `Record` creation. We do this to make sure that the chain of custody of a chip cannot be altered after the fact (thus breaking authentication of chips).

# How is the ERS Registry updated?
As mentioned above the ERS Registry can only be updated by the `owner` of a given `Record`. The most common update will be adding subnodes for a given name. Subnodes can be added in the following ways...

## Creating Developer Subnodes
The root of each name is the `.ers` node which is owned by the `DeveloperRegistry`. Since the `DeveloperRegistry` owns the `.ers` domain it can create new subdomains for each Developer that joins the system, thus making `[Developer].ers` names. New Developer subnodes are created when a Developer calls `createDeveloperRegistrar` on the `DeveloperRegistry`, the resulting `DeveloperRegistrar` address is set as the `owner` and `resolver`.

## Creating Project Subnodes
`DeveloperRegistars` are required to be trusted contracts of the system because they must correctly add project subdomains to the Developers domains. This creates subdomains of the structure, `[project].developer.ers`. Similarly the project subdomain is created by calling `addProject` on the `DeveloperRegistrar` which sets the passed `ProjectRegistrar` as the  `owner` and `resolver` of the subdomain.

## Creating Chip Subnodes
`ProjectRegistrars` set subnodes for each chip enrolled in the project via the `addChip` process. The big difference from other nodes is that chip subnodes have the `chipId` set as the `resolver` address, where for chip subnodes the `ServicesRegistry` is set as the resolver address. Additionally, the `owner` address can be updated as part of a transfer call to the `ChipRegistry`, in this way the chain of custody is still preserved even when chip ownership is transferred.

# Additional Permissions
In addition to the permissions described above the `ERSRegistry` also has a few other permissioned functions that are used to manage the system:
1. The Developer subnodes can be clawed back by the DeveloperRegistry via the `deleteSubnodeRecord` function. In this instance the history of projects and chips under the Developer is still maintained but the Developer can no longer add new projects or chips.
2. The `ChipRegistry` has the ability to update the `owner` parameter of chip subnodes via the `setNodeOwner` function. This is used to maintain state when chips are transferred from one owner to another. Note that node owners still maintain the ability to transfer ownership of chips this just builds allows the `ChipRegistry` to be able to transfer on behalf of an owner during transfer.
