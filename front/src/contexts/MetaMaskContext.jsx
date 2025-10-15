import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { createContract, registerUser, completeLesson, completeStep, getUserProgress, isLessonCompleted, isStepCompleted, getCourseProgress, calculateCourseProgress } from '../services/contractService';

const MetaMaskContext = createContext();

export const useMetaMask = () => {
    const context = useContext(MetaMaskContext);
    if (!context) {
        throw new Error('useMetaMask must be used within a MetaMaskProvider');
    }
    return context;
};

export const MetaMaskProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if we have a stored connection
        const storedAccount = localStorage.getItem('metamask_account');
        if (storedAccount) {
            setAccount(storedAccount);
            setIsConnected(true);
        }

        setupEventListeners();
        return () => {
            removeEventListeners();
        };
    }, []);

    const setupEventListeners = () => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
        }
    };

    const removeEventListeners = () => {
        if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', () => window.location.reload());
        }
    };

    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            // User disconnected their wallet
            setAccount(null);
            setIsConnected(false);
            localStorage.removeItem('metamask_account');
        } else {
            // User switched accounts
            setAccount(accounts[0]);
            setIsConnected(true);
            localStorage.setItem('metamask_account', accounts[0]);
        }
    };

    const connect = async () => {
        try {
            if (!window.ethereum) {
                setError('Please install MetaMask to use this application');
                return;
            }
    
            // Explicitly request accounts (MetaMask pop-up)
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
            if (accounts.length === 0) {
                setError('No accounts found');
                return;
            }
    
            const provider = new ethers.BrowserProvider(window.ethereum);
    
            // IMPORTANT: getSigner requires the account index (0 for first account)
            const signer = await provider.getSigner(accounts[0]);
    
            // Initialize contract using signer
            const contractInstance = createContract(provider, signer);
    
            // Set state
            setProvider(provider);
            setSigner(signer);
            setContract(contractInstance);
            setAccount(accounts[0]);
            setIsConnected(true);
            localStorage.setItem('metamask_account', accounts[0]);
    
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };
    
    const disconnect = () => {
        setAccount(null);
        setIsConnected(false);
        localStorage.removeItem('metamask_account');
    };

    const registerUserInContract = async (username) => {
        if (!contract || !account) return;
        return registerUser(contract, account, username);
    };

    const markLessonComplete = async (lessonId) => {
        if (!contract || !account) return;
        return completeLesson(contract, account, lessonId);
    };

    const markStepComplete = async (stepId, courseId) => {
        if (!contract || !account) return;
        return completeStep(contract, stepId, courseId);
    };

    const getProgress = async () => {
        if (!contract || !account) return null;
        return getUserProgress(contract, account);
    };

    const checkLessonCompletion = async (lessonId) => {
        if (!contract || !account) return false;
        return isLessonCompleted(contract, account, lessonId);
    };

    const checkStepCompletion = async (stepId) => {
        if (!contract || !account) return false;
        return isStepCompleted(contract, account, stepId);
    };

    const getCourseProgressData = async (courseId) => {
        if (!contract || !account) return null;
        return getCourseProgress(contract, account, courseId);
    };

    const getCourseCompletionPercentage = async (courseId) => {
        if (!contract || !account) return 0;
        return calculateCourseProgress(contract, account, courseId);
    };

    const value = {
        account,
        provider,
        signer,
        isConnected,
        error,
        connect,
        disconnect,
        registerUserInContract,
        markLessonComplete,
        markStepComplete,
        getProgress,
        checkLessonCompletion,
        checkStepCompletion,
        getCourseProgressData,
        getCourseCompletionPercentage
    };

    return (
        <MetaMaskContext.Provider value={value}>
            {children}
        </MetaMaskContext.Provider>
    );
}; 