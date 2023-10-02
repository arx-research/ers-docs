# What is the ERS Registry?
The ERS Registry is a modified fork of the ENS Registry used to track ERS names. ERS names provide a way to track the chain of custody of chips from manufacturer to TSM to Project to end-user, in this way the ERSRegistry contract acts as an easy way to validate the authenticity of items that contain embedded chips enrolled in the ERS system.

Each name is associated with a `Record` that points towards an `owner` and `resolver` address. The `owner` address is the address that can add subdomains to a given name. In some instances the `owner` is also allowed to set a new `owner` of the `Record`. However, once set the `resolver` parameter of a `Record` cannot be updated, it is forever tied to the address / chip that was specified upon `Record` creation. We do this to make sure that the chain of custody of a chip cannot be altered after the fact (thus breaking authentication of chips).

# How is the ERS Registry updated?
As mentioned above the ERS Registry can only be updated by the `owner` of a given `Record`. The most common update will be adding subnodes for a given name. Subnodes can be added in the following ways...

## Creating TSM Subnodes
The root of each name is the `.ers` node which is owned by the `TSMRegistry`. Since the `TSMRegistry` owns the `.ers` domain it can create new subdomains for each TSM that joins the system, thus making `[tsm].ers` names. New TSM subnodes are created when a TSM calls `createTSMRegistrar` on the `TSMRegistry`, the resulting `TSMRegistrar` address is set as the `owner` and `resolver`.

## Creating Project Subnodes
`TSMRegistars` are required to be trusted contracts of the system because they must correctly add project subdomains to the TSMs domains. This creates subdomains of the structure, `[project].tsm.ers`. Similarly the project subdomain is created by calling `addProject` on the `TSMRegistrar` which sets the passed `ProjectRegistrar` as the  `owner` and `resolver` of the subdomain.

## Creating Chip Subnodes
`ProjectRegistrars` set subnodes for each chip enrolled in the project via the chip claim process. Due to the variability in possible implementations we do not require `ProjectRegistrars` to be permissioned contracts have we do validate that `ERSRegistry` state is et correctly during the claim process so that we can be ensured that the chain of custody is preserved. The big difference from other nodes is that chip subnodes have the `chipId` set as the `resolver` address but the `owner` is a user-defined address. Additionally, the `owner` address can be updated as part of a transfer call to the `ChipRegistry`, in this way the chain of custody is still preserved even when chip ownership is transferred.

# Additional Permissions
In addition to the permissions described above the `ERSRegistry` also has a few other permissioned functions that are used to manage the system:
1. The TSM subnodes can be clawed back by the TSMRegistry via the `deleteSubnodeRecord` function. In this instance the history of projects and chips under the TSM is still maintained but the TSM can no longer add new projects or chips.
2. The `ChipRegistry` has the ability to update the `owner` parameter of chip subnodes via the `setNodeOwner` function. This is used to maintain state when chips are transferred from one owner to another. Note that node owners still maintain the ability to transfer ownership of chips this just builds allows the `ChipRegistry` to be able to transfer on behalf of an owner during transfer.
