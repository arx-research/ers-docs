# Who Are Manufacturers?
Manufacturers are those that source chips from a factory that can be sold to brands and creators so that they can be embedded in products.

## How is a Manufacturer added?
Manufacturers are added via governance. Manufacturers are ultimately the bedrock of the system. Their are responsible for being able to ensure the security of their chips. As such it is important to ensure that only trusted manufacturers are added to the system.

## What can Manufacturers do?
The vision is for all embedded chips to use ERS so that there is a one-stop location for resolving chips. In order for ERS to be able to prove the full provenance of a chip manufacturer's must enroll their chips in the system by calling `addChipEnrollment` on the `ManufacturerRegistry`. When enrolling chips, manufacturers are required to specify a few identifying parameters:
- **Chip ID**: This is the Ethereum public key represent by the chip. Note: this public key could be derived from the chip OR could represent an account contract that is tied to the chip.
- **Authentication Model**: this is primarily focused on the cryptographic curve programmed into the chip
- **Chip Model**: Some indication of the model of chip being enrolled

Additionally, manufacturers are responsible for four different pieces of information used for validation:
- **Manufacturer Certificate**: this is a signature 
- **Manufacturer Certificate Signer**: the public key of the signer of the certificate
- **Enrollment Merkle Tree / Root**: The manufacturer must create a merkle tree of all the chip IDs in the enrollment. The root of the merkle tree is stored on-chain and used to validate that a chip was created by a trusted manufacturer. Each leaf of the merkle tree represents a chip in the enrollment and is made up of the hash of the chip ID and the index of the chip.
- **Validation Data URI**: This is an IPFS URI that is stored on-chain. This URI holds the Manufacturer Certificate and Merkle proofs for each chip in the enrollment.

Manufacturer's are also encouraged to include a bootloader application address in their enrollment so that chips that may not have been enrolled in a project (but have been enrolled by the manufacturer) can still resolve. The bootloader app can contain whatever the manufacturer wants.
