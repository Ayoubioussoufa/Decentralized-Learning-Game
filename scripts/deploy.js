const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const solc = require('solc');

// Read the contract
const contractPath = path.resolve(__dirname, '../contracts/UserProgress.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// Compile the contract
const input = {
    language: 'Solidity',
    sources: {
        'UserProgress.sol': { content: source }
    },
    settings: {
        outputSelection: {
            '*': { '*': ['abi', 'evm.bytecode'] }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Deploy function
async function deploy() {
    try {
        // Connect to local blockchain (Ganache)
        const provider = new ethers.JsonRpcProvider('http://localhost:8545');

        // Use a private key from Ganache
        const privateKey = '0x12bd666ab52b84f1be82feb31a8036706fcc65415bd30ff297b109038411adc7';
        const wallet = new ethers.Wallet(privateKey, provider);

        console.log('Deploying contract from account:', wallet.address);

        // Get the contract ABI and bytecode
        const contractABI = output.contracts['UserProgress.sol'].UserProgress.abi;
        const contractBytecode = output.contracts['UserProgress.sol'].UserProgress.evm.bytecode.object;

        // Create contract factory
        const ContractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

        // Deploy the contract
        console.log('Deploying contract...');
        const contract = await ContractFactory.deploy({
            gasLimit: 5000000
        });

        // Wait for deployment
        await contract.waitForDeployment();
        const contractAddress = await contract.getAddress();
        console.log('Contract deployed at:', contractAddress);

        // Save contract address & ABI
        const addressPath = path.resolve(__dirname, '../front/src/contracts/contract-address.json');
        fs.writeFileSync(addressPath, JSON.stringify({ address: contractAddress }, null, 2));

        const abiPath = path.resolve(__dirname, '../front/src/contracts/UserProgress.json');
        fs.writeFileSync(abiPath, JSON.stringify({ abi: contractABI }, null, 2));

        console.log('Contract address saved to:', addressPath);
        console.log('Contract ABI saved to:', abiPath);
    } catch (error) {
        console.error('Error deploying contract:', error);
        if (error.reason) {
            console.error("Revert Reason:", error.reason);
        }
        if (error.transaction) {
            console.error("Transaction Data:", error.transaction);
        }
    }
}

deploy();
