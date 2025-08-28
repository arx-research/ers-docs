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

## Deployment Information

The primary ERS deployment is on **Base mainnet** (use `--network base` for production). For development and testing, use Sepolia testnet (`--network sepolia`). 

These scripts interact with the deployed ERS contracts. See the [Solidity API introduction](../solidity-api/intro.md) for contract addresses and detailed API documentation.
