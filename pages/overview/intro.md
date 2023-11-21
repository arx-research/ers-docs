# Introduction

The Ethereum Reality Service is a network of smart contracts that authenticate and resolve experiences against real world items anchored with secure element chips. 

Practically, this means that 

1. Brands can prove provenance of their goods onchain.
2. Developers can direct attested NFC chips to novel dapps.
3. Creators can immutably link physical art without centralized dependencies.
4. End users are able to track and verify the custody history of their product.

ERS leverages a combination of attestations, a namespace and binding enrollments to achieve these properties for users. In order to optimize deployment costs for manufacturers and developers, ERS uses EIP3668 and merkle trees in order to bundle together large numbers of chip certificates offchain. This data can be written onchain when desired, for instance by an end user who wishes to reflect ownership of an item onchain.
