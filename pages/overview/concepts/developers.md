# What Are Developers?
Developers take custody of chips from manufacturers and distribute enrolled chips to end users or other projects that are building on top of the Developer's infrastructure. Developers were referred to as TSMs in previous iterations of ERS.

## How is a Developer added?
A prospective Developer must first claim an available ERS name they wish to use, creating a `[developer].ers` name. This subdomain will be used to identify all projects launched under the Developer, for instance `[project].[developer].ers`. Adding a Developer is a three step process:
1. The Developer requests a name from the [ERS Name Approver](https://name.ers.run). The ERS Name Approver will generate a `_nameApprovalProof` if the name is not otherwise reserved. The ERS Name Approver is a governed function in ERS and reserves many common names; owners of a corresponding `.eth` name may be able to claim a name from the corresponding account presuming the name is not otherwise reserved.
2. The Developer submits the `_nameApprovalProof`, the `_developerName` and a `_proofTimestamp` to the `claimName` function of the `DeveloperNameGovernor`. If the proof is recent and valid, the `DeveloperNameGovernor` adds the "allowed" Developer to the `DeveloperRegistry`.
3. The Developer calls `createNewDeveloperRegistrar` which deploys a new `DeveloperRegistrar` contract that is owned by the Developer. This contract is used to manage the Developer's projects. When calling `createNewDeveloperRegistrar` the caller can select an implmentation of `DeveloperRegistrarFactory` they wish to use. Once deployed the implementation cannot be changed. `DeveloperRegistrarFactories` are permissioned implementations that can only be added by governance.

## What can Developers do?
Once the Developer has their `DeveloperRegistrar` deployed they can begin adding projects. Developers have two options for adding projects:
1. Developers add projects they create by calling `addProject` on their `DeveloperRegistrar` from the owner address of their `DeveloperRegistrar`
2. They can change the owner of their `DeveloperRegistrar` to another contract address which handles permissioning and any other requirements the Developer wants to impose on projects using it's namespace. This contract can then call `addProject` on the `DeveloperRegistrar` to add projects.

        IProjectRegistrar _projectRegistrar,
        bytes32 _nameHash,
        bytes32 _serviceId,
        uint256 _lockinPeriod

## Adding Projects
In order to add a project the following information must be provided:
- **Project Registrar**: The address of the project's registrar. This is the contract that will be used to manage the project's chips. End-users will go here to claim their chips. The registrar must implement the `ProjectRegistrar` interface.
- **Name Hash**: The hash of the project's name. This is used to ensure that the project name is unique, and creates the `[project].developer.ers` name for the project.
- **Service ID**: The primary `_serviceId` associated with the project and any chips deployed through the project.
- **Lock In Period**: The amount of time any chip within a project is locked to the primary service associated with that project. After this time end users may modify the associated service.

Once a project has been added you can see the project's information by calling `projectEnrollments` on the `ChipRegistry` and passing in the `ProjectRegistrar` address of the project. Additionally, this opens up the ability for Developers to `addChips` to a project which in turn may be claimed by end users.

## Example: Creating a Project
For an example of creating a project see [Creating A Project](../../scripts/create-project.md) section in our scripts documentation.

