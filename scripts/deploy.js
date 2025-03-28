async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const UserProgress = await ethers.getContractFactory("UserProgress");
  const userProgress = await UserProgress.deploy();
  await userProgress.deployed();
  console.log("UserProgress deployed to:", userProgress.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 