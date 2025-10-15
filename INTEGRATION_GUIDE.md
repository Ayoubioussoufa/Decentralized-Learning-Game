It's not fully working

# Full Integration Guide

## Overview
This guide explains the complete integration between the frontend, backend, and smart contract layers of the learning platform.

## System Architecture

### 1. Frontend (React + Vite)
- **Location**: `front/`
- **Port**: 5173 (default Vite port)
- **Features**:
  - Wallet authentication with MetaMask
  - Course progress tracking
  - Code verification and submission
  - Real-time progress updates

### 2. Backend (Node.js + Express)
- **Location**: `backend/`
- **Port**: 3001
- **Features**:
  - Ethereum signature verification
  - Smart contract interaction
  - Code verification logic
  - Progress tracking API

### 3. Smart Contract (Solidity)
- **Location**: `contracts/UserProgress.sol`
- **Features**:
  - User registration
  - Step completion tracking
  - Course progress calculation
  - On-chain progress storage

## Key Integration Features

### 1. Wallet Authentication
- Users must connect their wallet before accessing courses
- Signature-based authentication for all API calls
- Protected routes for course access

### 2. Code Verification
- Backend verifies submitted code against expected solutions
- Keyword-based matching with 80% threshold
- Automatic progress updates on successful verification

### 3. Progress Tracking
- Real-time progress bars on course pages
- Blockchain-stored completion data
- Visual progress indicators throughout the UI

### 4. Routing Fixes
- Proper React Router navigation
- No more incorrect route appending
- Clean URL structure

## Setup Instructions

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd front
npm install
```

### 2. Deploy Smart Contract
```bash
# From project root
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Update Contract Address
Update the contract address in:
- `backend/server.js` (line 14)
- `front/src/contracts/contract-address.json`

### 4. Start Services
```bash
# Terminal 1: Start Hardhat node
npx hardhat node

# Terminal 2: Start backend
cd backend
npm start

# Terminal 3: Start frontend
cd front
npm run dev
```

## API Endpoints

### Authentication Required (All endpoints require signature verification)
- `POST /api/register` - Register user
- `POST /api/complete-lesson` - Mark lesson as complete
- `POST /api/complete-step` - Mark step as complete
- `POST /api/verify-code` - Verify code submission

### Public Endpoints
- `GET /api/progress/:address` - Get user progress
- `GET /api/check-lesson/:address/:lessonId` - Check lesson completion
- `GET /api/check-step/:address/:stepId` - Check step completion
- `GET /api/course-progress/:address/:courseId` - Get course progress

## Code Verification Logic

The system uses a keyword-based approach to verify Solidity code:

1. **Normalization**: Removes whitespace and normalizes formatting
2. **Keyword Extraction**: Extracts important Solidity constructs
3. **Matching**: Compares submitted code against expected code
4. **Threshold**: Requires 80% of expected keywords to match

### Extracted Keywords
- Pragma statements
- Contract declarations
- Function declarations
- Variable declarations
- Modifier declarations
- Event declarations

## Security Features

1. **Signature Verification**: All API calls require Ethereum signatures
2. **Address Validation**: Signatures are verified against user addresses
3. **Protected Routes**: Course access requires wallet connection
4. **Input Validation**: Code submissions are validated before processing

## User Flow

1. **Landing Page**: User sees course overview
2. **Wallet Connection**: User connects MetaMask wallet
3. **Course Access**: User can now access protected course content
4. **Code Submission**: User writes and submits code
5. **Verification**: Backend verifies code correctness
6. **Progress Update**: Smart contract updates progress
7. **UI Update**: Frontend shows updated progress

## Troubleshooting

### Common Issues

1. **Contract Address Not Found**
   - Ensure contract is deployed and address is updated
   - Check Hardhat node is running

2. **Signature Verification Failed**
   - Ensure MetaMask is connected
   - Check if user has signed the message

3. **Progress Not Updating**
   - Verify backend is running
   - Check console for API errors
   - Ensure smart contract interaction is successful

4. **Routing Issues**
   - Clear browser cache
   - Ensure React Router is properly configured

### Development Tips

1. **Contract Changes**: Redeploy contract after changes
2. **Backend Changes**: Restart backend server
3. **Frontend Changes**: Vite hot reload should handle most changes
4. **Testing**: Use browser dev tools to monitor network requests

## Environment Variables

### Backend (.env)
```
PORT=3001
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Production Deployment

1. **Smart Contract**: Deploy to mainnet/testnet
2. **Backend**: Deploy to cloud service (Heroku, AWS, etc.)
3. **Frontend**: Deploy to hosting service (Vercel, Netlify, etc.)
4. **Update**: Contract addresses and API URLs for production

## Testing Checklist

- [ ] Wallet connection works
- [ ] Course access requires authentication
- [ ] Code verification works correctly
- [ ] Progress updates in real-time
- [ ] Navigation works without route issues
- [ ] Backend API endpoints respond correctly
- [ ] Smart contract interactions succeed
- [ ] UI shows correct progress percentages
