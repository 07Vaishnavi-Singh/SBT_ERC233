const {ethers}  = require("hardhat");

async function main() {
 
  const contractInstance = await ethers.getContractFactory("SBTERC223")
  const deployedContractInstance = await contractInstance.deploy(
  );
  await deployedContractInstance.deployed();

  console.log("  contract address :", deployedContractInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


