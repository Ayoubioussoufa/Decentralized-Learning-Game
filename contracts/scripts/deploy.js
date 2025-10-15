const { ethers, artifacts } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying UserProgress contract...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    (await deployer.provider.getBalance(deployer.address)).toString()
  );

  // Deploy the contract
  const UserProgress = await ethers.getContractFactory("UserProgress");
  const userProgress = await UserProgress.deploy();
  await userProgress.waitForDeployment();

  const contractAddress = await userProgress.getAddress();
  console.log("UserProgress contract deployed to:", contractAddress);

  // Get ABI from Hardhat artifacts
  const artifact = await artifacts.readArtifact("UserProgress"); // ✅ Returns JSON object
  const abiData = {
    abi: artifact.abi,
    contractName: "UserProgress",
    network: await ethers.provider.getNetwork(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  // Create backend output directory
  const backendDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(backendDir)) {
    fs.mkdirSync(backendDir, { recursive: true });
  }

  // Save contract address
  const addressData = {
    address: contractAddress,
    network: await ethers.provider.getNetwork(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(backendDir, "UserProgress-address.json"),
    JSON.stringify(addressData, null, 2)
  );

  // Save ABI for backend
  fs.writeFileSync(
    path.join(backendDir, "UserProgress.json"),
    JSON.stringify(abiData, null, 2)
  );

  // Create frontend output directory
  const frontendDir = path.join(__dirname, "..", "..", "front", "src", "contracts");
  if (!fs.existsSync(frontendDir)) {
    fs.mkdirSync(frontendDir, { recursive: true });
  }

  // Save contract address and ABI for frontend
  fs.writeFileSync(
    path.join(frontendDir, "contract-address.json"),
    JSON.stringify({ address: contractAddress }, null, 2)
  );
  fs.writeFileSync(
    path.join(frontendDir, "UserProgress.json"),
    JSON.stringify(abiData, null, 2)
  );

  // Update frontend .env file with contract address
  const frontendEnvPath = path.join(frontendDir, "..", "..", ".env");
  const envContent = `# Frontend Environment Variables
# API URL for backend communication
VITE_API_URL=http://localhost:3001/api

# Contract address (auto-updated from deployment)
VITE_CONTRACT_ADDRESS=${contractAddress}
`;
  
  if (fs.existsSync(frontendEnvPath)) {
    // Update existing .env file
    let envFileContent = fs.readFileSync(frontendEnvPath, "utf8");
    if (envFileContent.includes("VITE_CONTRACT_ADDRESS")) {
      envFileContent = envFileContent.replace(
        /VITE_CONTRACT_ADDRESS=.*/,
        `VITE_CONTRACT_ADDRESS=${contractAddress}`
      );
    } else {
      envFileContent += `\nVITE_CONTRACT_ADDRESS=${contractAddress}\n`;
    }
    fs.writeFileSync(frontendEnvPath, envFileContent);
  } else {
    // Create new .env file
    fs.writeFileSync(frontendEnvPath, envContent);
  }

  console.log("Contract information saved to:");
  console.log(`- ${path.join(backendDir, "UserProgress-address.json")}`);
  console.log(`- ${path.join(backendDir, "UserProgress.json")}`);
  console.log(`- ${path.join(frontendDir, "contract-address.json")}`);
  console.log(`- ${path.join(frontendDir, "UserProgress.json")}`);
  console.log(`- ${frontendEnvPath} (updated with contract address)`);

  // Verify deployment by calling a view function (example)
  try {
    const owner = await userProgress.owner();
    console.log("Contract owner:", owner);
  } catch (err) {
    console.log("No owner function found or call failed:", err.message);
  }

  return {
    contractAddress,
    abi: artifact.abi,
  };
}

// Run deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
