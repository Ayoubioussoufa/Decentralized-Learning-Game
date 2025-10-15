const fs = require('fs');
const path = require('path');

// Create .env file for frontend with default values
const envContent = `# Frontend Environment Variables
# API URL for backend communication
VITE_API_URL=http://localhost:3001/api

# Contract address (will be updated after deployment)
VITE_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
`;

const envPath = path.join(__dirname, '.env');

// Only create .env if it doesn't exist
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file for frontend');
  console.log('📝 You can update the values in front/.env as needed');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n🔧 Environment Variables:');
console.log('VITE_API_URL=http://localhost:3001/api');
console.log('VITE_CONTRACT_ADDRESS=<contract-address>');
console.log('\n📚 Note: In Vite, environment variables must be prefixed with VITE_ to be accessible in the browser');
