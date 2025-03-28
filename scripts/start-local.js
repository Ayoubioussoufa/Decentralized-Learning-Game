const { exec } = require('child_process');
const path = require('path');

// Start Hardhat node
const startNode = () => {
    console.log('Starting Hardhat node...');
    const node = exec('npx hardhat node', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting node: ${error}`);
            return;
        }
        console.log(stdout);
    });

    // Wait for node to start
    setTimeout(() => {
        // Deploy contract
        console.log('Deploying contract...');
        exec('npx hardhat run scripts/deploy.js --network localhost', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error deploying contract: ${error}`);
                return;
            }
            console.log(stdout);
            
            // Extract contract address from deployment output
            const contractAddress = stdout.match(/UserProgress deployed to: (0x[a-fA-F0-9]{40})/)[1];
            console.log(`Contract deployed to: ${contractAddress}`);
            
            // Update .env file with contract address
            const fs = require('fs');
            const envPath = path.join(__dirname, '../backend/.env');
            fs.writeFileSync(envPath, `CONTRACT_ADDRESS=${contractAddress}\n`);
            console.log('Updated .env file with contract address');
        });
    }, 5000); // Wait 5 seconds for node to start
};

startNode(); 