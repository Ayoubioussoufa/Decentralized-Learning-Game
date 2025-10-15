import express from 'express';
import cors from 'cors';
import Web3 from 'web3';
import UserProgress from '../contracts/artifacts/contracts/UserProgress.sol/UserProgress.json' assert { type: "json" };

const app = express();
app.use(cors());
app.use(express.json());

// Utility function to convert BigInt values to strings for JSON serialization
const convertBigIntToString = (obj) => {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj === 'bigint') return obj.toString();
    if (Array.isArray(obj)) return obj.map(convertBigIntToString);
    if (typeof obj === 'object') {
        const converted = {};
        for (const [key, value] of Object.entries(obj)) {
            converted[key] = convertBigIntToString(value);
        }
        return converted;
    }
    return obj;
};

// Connect to local Hardhat node
const web3 = new Web3('http://127.0.0.1:8545');

// Contract address and ABI
const contractAddress = process.env.CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3';
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
        const { stepId, courseId } = req.body;
        const tx = await userProgressContract.methods.completeStep(stepId, courseId)
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
        
        // Convert BigInt values to strings for JSON serialization
        res.json(convertBigIntToString({
            username: progress.username,
            joinDate: progress.joinDate,
            totalPoints: progress.totalPoints,
            isActive: progress.isActive
        }));
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

app.get('/api/course-progress/:address/:courseId', async (req, res) => {
    try {
        const { address, courseId } = req.params;
        const progress = await userProgressContract.methods
            .getCourseProgress(address, courseId)
            .call();
        
        // Convert BigInt values to strings for JSON serialization
        res.json(convertBigIntToString({
            completedSteps: progress.completedSteps,
            totalSteps: progress.totalSteps,
            completionPercentage: progress.completionPercentage,
            isCompleted: progress.isCompleted
        }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Code verification endpoint
// Code verification endpoint
app.post('/api/verify-code', verifySignature, async (req, res) => {
    try {
        const { stepId, submittedCode, expectedCode } = req.body;

        console.log('=== Code Verification Request ===');
        console.log('Step ID:', stepId);
        console.log('User Address:', req.userAddress);
        console.log('Submitted Code Length:', submittedCode?.length || 0);
        console.log('Expected Code Length:', expectedCode?.length || 0);

        // Verify the code
        const isCorrect = verifyCodeSubmission(submittedCode, expectedCode);

        console.log('Verification Result:', isCorrect);

        if (isCorrect) {
            res.json({ 
                success: true, 
                isCorrect: true,
                message: "Code verification successful! You can now complete the step on-chain."
            });
        } else {
            res.json({ 
                success: true, 
                isCorrect: false,
                message: "Code verification failed. Please check your implementation and try again."
            });
        }
    } catch (error) {
        console.error('Code verification error:', error);
        res.status(500).json({ 
            error: error.message,
            details: "Check server logs for more information"
        });
    }
});


// Code verification function
function verifyCodeSubmission(submittedCode, expectedCode) {
    if (!submittedCode || !expectedCode) {
        console.log('Missing code:', { submittedCode: !!submittedCode, expectedCode: !!expectedCode });
        return false;
    }
    
    // Normalize whitespace and line endings
    const normalizeCode = (code) => {
        return code
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(/\s+/g, ' ')
            .trim();
    };
    
    const normalizedSubmitted = normalizeCode(submittedCode);
    const normalizedExpected = normalizeCode(expectedCode);
    
    console.log('Normalized submitted:', normalizedSubmitted.substring(0, 100) + '...');
    console.log('Normalized expected:', normalizedExpected.substring(0, 100) + '...');
    
    // First, try exact match (case-insensitive)
    if (normalizedSubmitted.toLowerCase() === normalizedExpected.toLowerCase()) {
        console.log('Exact match found');
        return true;
    }
    
    // Extract keywords from both codes
    const expectedKeywords = extractKeywords(normalizedExpected);
    const submittedKeywords = extractKeywords(normalizedSubmitted);
    
    console.log('Expected keywords:', expectedKeywords);
    console.log('Submitted keywords:', submittedKeywords);
    
    // If no keywords found, fall back to basic string comparison
    if (expectedKeywords.length === 0) {
        console.log('No keywords found, using basic comparison');
        return normalizedSubmitted.toLowerCase().includes(normalizedExpected.toLowerCase()) ||
               normalizedExpected.toLowerCase().includes(normalizedSubmitted.toLowerCase());
    }
    
    // Count how many expected keywords are present
    let matchCount = 0;
    for (const keyword of expectedKeywords) {
        if (submittedKeywords.some(submitted => 
            submitted.toLowerCase().includes(keyword.toLowerCase()) ||
            keyword.toLowerCase().includes(submitted.toLowerCase())
        )) {
            matchCount++;
        }
    }
    
    console.log(`Match count: ${matchCount}/${expectedKeywords.length}`);
    
    // Require at least 60% of expected keywords to be present (lowered threshold)
    const matchThreshold = Math.max(1, Math.ceil(expectedKeywords.length * 0.6));
    const result = matchCount >= matchThreshold;
    
    console.log(`Verification result: ${result} (threshold: ${matchThreshold})`);
    return result;
}

function extractKeywords(code) {
    // Extract important Solidity keywords, function names, and structure elements
    const keywords = [];
    
    try {
        // Extract pragma statements
        const pragmaMatches = code.match(/pragma\s+solidity[^;]+;/gi);
        if (pragmaMatches) keywords.push(...pragmaMatches);
        
        // Extract contract declarations
        const contractMatches = code.match(/contract\s+\w+\s*{/gi);
        if (contractMatches) keywords.push(...contractMatches);
        
        // Extract function declarations (more flexible)
        const functionMatches = code.match(/function\s+\w+[^{]*{/gi);
        if (functionMatches) keywords.push(...functionMatches);
        
        // Extract variable declarations (more comprehensive)
        const variableMatches = code.match(/(?:uint|int|bool|string|address|bytes|mapping)\s+\w+/gi);
        if (variableMatches) keywords.push(...variableMatches);
        
        // Extract modifier declarations
        const modifierMatches = code.match(/modifier\s+\w+[^{]*{/gi);
        if (modifierMatches) keywords.push(...modifierMatches);
        
        // Extract event declarations
        const eventMatches = code.match(/event\s+\w+[^;]+;/gi);
        if (eventMatches) keywords.push(...eventMatches);
        
        // Extract struct declarations
        const structMatches = code.match(/struct\s+\w+\s*{/gi);
        if (structMatches) keywords.push(...structMatches);
        
        // Extract important keywords
        const importantKeywords = code.match(/\b(?:public|private|internal|external|view|pure|payable|returns|require|assert|revert)\b/gi);
        if (importantKeywords) keywords.push(...importantKeywords);
        
        // Extract function calls and variable assignments
        const assignments = code.match(/\w+\s*=\s*\w+/g);
        if (assignments) keywords.push(...assignments);
        
        // Extract return statements
        const returns = code.match(/return\s+[^;]+;/gi);
        if (returns) keywords.push(...returns);
        
    } catch (error) {
        console.log('Error extracting keywords:', error.message);
    }
    
    // Remove duplicates and filter out empty strings
    return [...new Set(keywords.filter(keyword => keyword && keyword.trim().length > 0))];
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 