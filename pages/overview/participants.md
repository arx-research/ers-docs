# System Participants

This article outlines the different actors / participants in the ERS system. The intention is to lay a ground work for describing the common flows in the system.

## Manufacturers
The party responsible for the manufacture of configured chips which are ultimately provided to the brands and creators who integrate them into physical goods. Manufacturer's enroll their chips in the protocol so that chip holders can track chip possession and ownership from the factory floor to the end consumer.

## TSMs
The brand, creator or integrator that enrolls or “mints” chips against the physical things they are embedded in or attached to. Large brands will typically bulk enroll large numbers of chips, while integrators may act on behalf of smaller brands as the TSM in order to save costs. A TSM is responsible for the scanning experience that a chip resolves to as well as a primary experience __[Add link to Service Definition]__ for the end user. The term TSM derives from cellular network operators that historically managed SIM card based applications.

## Chip Owners
The holder of a chip at a given point in time, typically the end user for most of the chip’s life cycle. The owner has the ability to mutate certain on-chain features of the chip, such as add linked services and modify the primary service (based on some preconditions). Ownership can be represented through an NFT/PBT compatible interface whereby the chip identifier is used as the tokenId.

## Service Providers
Third-parties that create applications that chip owners can add to subscribe / add to their chip. This could be a service that easily links tickets or other experiences to a chip. Often a TSM may also act as a service provider but they are not required to do so.
