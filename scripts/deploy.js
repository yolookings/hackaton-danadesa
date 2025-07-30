const hre = require("hardhat")

async function main() {
  console.log("Deploying DanaDesa contract...")

  // Get the ContractFactory and Signers here.
  const DanaDesa = await hre.ethers.getContractFactory("DanaDesa")
  const [deployer] = await hre.ethers.getSigners()

  console.log("Deploying contracts with the account:", deployer.address)
  console.log("Account balance:", (await deployer.getBalance()).toString())

  // Deploy the contract
  const danaDesa = await DanaDesa.deploy()
  await danaDesa.deployed()

  console.log("DanaDesa contract deployed to:", danaDesa.address)
  console.log("Admin address:", await danaDesa.admin())

  // Save the contract address and ABI to a file for frontend use
  const fs = require("fs")
  const contractsDir = "./contracts-info"

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ DanaDesa: danaDesa.address }, undefined, 2),
  )

  const DanaDesaArtifact = await hre.artifacts.readArtifact("DanaDesa")

  fs.writeFileSync(contractsDir + "/DanaDesa.json", JSON.stringify(DanaDesaArtifact, null, 2))

  console.log("Contract info saved to contracts-info/")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
