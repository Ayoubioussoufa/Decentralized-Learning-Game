const express = require('express');
const cors = require('cors');
const Web3 = require('web3');
const UserProgress = require('./contracts/UserProgress.json');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to local Hardhat node
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Contract address and ABI
const contractAddress = process.env.CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS'; // We'll update this after deployment
const contractABI = UserProgress.abi;

// Create contract instance
const userProgressContract = new web3.eth.Contract(contractABI, contractAddress);

// Middleware to verify Ethereum signature
const verifySignature = async (req, res, next) => {
    try {
        const { signature, message, address } = req.body;
        const recoveredAddress = web3.eth.accounts.recover(message, signature);
        
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            return res.status(401).json({ error: 'Invalid signature' });
        }
        
        req.userAddress = address;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error verifying signature' });
    }
};

// Routes
app.post('/api/register', verifySignature, async (req, res) => {
    try {
        const { username } = req.body;
        const tx = await userProgressContract.methods.registerUser(username)
            .send({ from: req.userAddress });
        
        res.json({ success: true, transactionHash: tx.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/complete-lesson', verifySignature, async (req, res) => {
    try {
        const { lessonId } = req.body;
        const tx = await userProgressContract.methods.completeLesson(lessonId)
            .send({ from: req.userAddress });
        
        res.json({ success: true, transactionHash: tx.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/complete-step', verifySignature, async (req, res) => {
    try {
        const { stepId } = req.body;
        const tx = await userProgressContract.methods.completeStep(stepId)
            .send({ from: req.userAddress });
        
        res.json({ success: true, transactionHash: tx.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/progress/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const progress = await userProgressContract.methods.getUserProgress(address).call();
        
        res.json({
            username: progress.username,
            joinDate: progress.joinDate,
            totalPoints: progress.totalPoints,
            isActive: progress.isActive
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/check-lesson/:address/:lessonId', async (req, res) => {
    try {
        const { address, lessonId } = req.params;
        const isCompleted = await userProgressContract.methods
            .isLessonCompleted(address, lessonId)
            .call();
        
        res.json({ isCompleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/check-step/:address/:stepId', async (req, res) => {
    try {
        const { address, stepId } = req.params;
        const isCompleted = await userProgressContract.methods
            .isStepCompleted(address, stepId)
            .call();
        
        res.json({ isCompleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 