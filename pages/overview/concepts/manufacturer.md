# Who Are Manufacturers?
Manufacturers create or source chips that they sell them to brands and creators so that they can be embedded in products.

## How is a Manufacturer added?
Manufacturers are added via governance. Manufacturers are ultimately the bedrock of the system. Their are responsible for being able to ensure the security of their chips. As such it is important to ensure that only trusted manufacturers are added to the system.

## What can Manufacturers do?
The vision is for all embedded chips to use ERS so that there is a one-stop location for resolving chips. In order for ERS to be able to prove the full provenance of a chip manufacturer's must enroll their chips in the system by calling `addChipEnrollment` on the `ManufacturerRegistry`. When enrolling chips, manufacturers are required to specify a few identifying parameters:
- **Manufacturer Certificate**: this is a signature of each chip. How certificates are issued and stored is out of scope from ERS. For Arx Research chips, a publicly accessibly Supabase can be interrogated for a given chip certificate.
- **Manufacturer Certificate Signer**: a manufacturer keypair that is used to generate certificates of each chip enrolled.
- **Authentication Model**: this is primarily focused on the cryptographic curve programmed into the chip
- **Enrollment Authentication Model**: this is focused on the cryptographic curve by which manufacturer certificates were generated
- **Chip Model**: Some indication of the model of chip being enrolled

Optionally manufactures may provide:

- **Validation Data URI**: A URI that is stored onchain and may contain additional enrollment data such as manufacturer certificates associated with a given enrollment.

Manufacturer's are also encouraged to include a bootloader application address in their enrollment so that chips that may not have been enrolled in a project (but have been enrolled by the manufacturer) can still resolve. The bootloader app can contain whatever the manufacturer wants.
