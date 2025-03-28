import React, { createContext, useContext, useState } from 'react';
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

    const connect = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                setIsConnected(true);
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
    };

    return (
        <MetaMaskContext.Provider value={{ account, web3, isConnected, error, connect, disconnect }}>
            {children}
        </MetaMaskContext.Provider>
    );
}; 