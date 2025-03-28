const solc = require('solc');
const fs = require('fs');
const path = require('path');

// Read the contract
const contractPath = path.resolve(__dirname, '../contracts/UserProgress.sol');
let source;
try {
    source = fs.readFileSync(contractPath, 'utf8');
} catch (err) {
    console.error(`Error reading contract file: ${err.message}`);
    process.exit(1);
}

// Compile the contract
const input = {
    language: 'Solidity',
    sources: {
        'UserProgress.sol': {
            content: source
        }
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 200
        },
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode']
            }
        }
    }
};

let output;
try {
    output = JSON.parse(solc.compile(JSON.stringify(input)));
} catch (err) {
    console.error(`Error compiling contract: ${err.message}`);
    process.exit(1);
}

// Check for errors in the output
if (output.errors) {
    output.errors.forEach((error) => {
        console.error(error.formattedMessage);
    });
    process.exit(1);
}

// Create contracts directory if it doesn't exist
const contractsDir = path.resolve(__dirname, '../front/src/contracts');
if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
}

// Write the ABI to a file
const abiPath = path.resolve(contractsDir, 'UserProgress.json');
try {
    fs.writeFileSync(abiPath, JSON.stringify(output.contracts['UserProgress.sol'].UserProgress.abi, null, 2));
    console.log('Contract compiled and ABI generated successfully!');
} catch (err) {
    console.error(`Error writing ABI file: ${err.message}`);
    process.exit(1);
}
