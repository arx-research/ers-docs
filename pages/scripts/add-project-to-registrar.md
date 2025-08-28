# Adding a Project to a Registrar

This script manually adds an existing project to a DeveloperRegistrar. This is useful for troubleshooting scenarios where a project was created successfully but failed to be added to the registrar during the normal creation process.

## Set Up
_If you are trying to execute a transaction it is assumed that you have also read the [Set Up](setup.md) section._

You'll need the same Developer account setup as described in the [Claim A Developer Name](claim-name.md) section:

```
...
TESTNET_DEVELOPER_OWNER_PRIVATE_KEY=your_private_key_here
...
BASE_DEVELOPER_OWNER_PRIVATE_KEY=your_private_key_here
```

## Usage
Arguments:
`network`: The network you want to interact with (defaults to `hardhat`)

```bash
yarn addProjectToRegistrar --network [network]
```

The script will prompt you for:
- **DeveloperRegistrar address** - The address of your deployed DeveloperRegistrar
- **ProjectRegistrar address** - The address of the existing project you want to add
- **Project name** - The name you want to assign to the project in the namespace
- **Service ID** - The service ID this project should be associated with
- **Lockin period** - The lockin period for chip transfers (in seconds)

The script will verify that the ProjectRegistrar belongs to the specified DeveloperRegistrar before proceeding with the addition.

## When to Use This Script
- A project was deployed successfully but failed to be added to your DeveloperRegistrar
- You need to manually associate an existing project with a different service or update project metadata
- Troubleshooting deployment issues where the project creation partially failed