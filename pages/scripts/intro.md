# Introduction
This section covers how to interact with the ERS system using the [ERS Scripts Repo](https://github.com/arx-research/ers-scripts). These scripts enable the following functionality:
- Claiming a Developer Name
- Deploying a Developer Project Registrar
- Creating a Service
- Creating a Project
- Manually Adding a Project to a Registrar (for troubleshooting)
- Transferring Ownership of a Chip
- Scanning Chips (for testing and data collection)

Additional these scripts can be used locally to create and simulate manufacturers and manufacturer enrollments.

Before using this repo it is suggested to review the [Overview](../overview/intro.md) of the ERS protocol.

## Base Mainnet Deployment

The primary ERS deployment is live on Base mainnet with the following core contract addresses:

- **ERSRegistry**: `0xB680dD0fCA4ea30d8C2cc5F07C5087eBA5366E5e`
- **ChipRegistry**: `0xbbB1c125A8eA6feabD6524953cB4b8CD876345ED` 
- **DeveloperRegistry**: `0x9Eb8550d62457B17DFF95606b4064afEc72585d8`
- **ServicesRegistry**: `0x4CA723223c120CE3aAe453ee9CDffB8F724FE274`
- **ManufacturerRegistry**: `0xffC5B00E5E534E35D9611278600b1A10df7C83e8`

For testing purposes, Sepolia testnet deployments are available in the [ers-scripts deployments folder](https://github.com/arx-research/ers-scripts/tree/main/deployments).
