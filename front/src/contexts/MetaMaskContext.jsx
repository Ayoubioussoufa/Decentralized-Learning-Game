import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

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
    const [web3, setWeb3] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeWeb3 = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                
                // Check if we have a stored connection
                const storedAccount = localStorage.getItem('metamask_account');
                if (storedAccount) {
                    setAccount(storedAccount);
                    setIsConnected(true);
                }
            } else {
                setError('Please install MetaMask to use this application');
            }
        };

        initializeWeb3();
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
            if (typeof window.ethereum !== 'undefined') {
                // Only request connection when user clicks the button
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsConnected(true);
                    localStorage.setItem('metamask_account', accounts[0]);
                }
            } else {
                setError('Please install MetaMask to use this application');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const disconnect = () => {
        setAccount(null);
        setIsConnected(false);
        localStorage.removeItem('metamask_account');
    };

    return (
        <MetaMaskContext.Provider value={{ account, web3, isConnected, error, connect, disconnect }}>
            {children}
        </MetaMaskContext.Provider>
    );
}; 