import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMetaMask } from '../contexts/MetaMaskContext';

const ProtectedRoute = ({ children }) => {
  const { isConnected, connect } = useMetaMask();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-black/50 border border-[#C8AA6E]/20 rounded-lg p-8 max-w-md mx-4 text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-[#C8AA6E] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">Wallet Required</h2>
            <p className="text-gray-400">
              Please connect your wallet to access courses and track your progress on the blockchain.
            </p>
          </div>
          
          <button 
            onClick={connect}
            className="w-full bg-[#C8AA6E] text-black py-3 rounded-lg hover:bg-[#C8AA6E]/90 transition-colors font-medium text-lg mb-4"
          >
            Connect Wallet
          </button>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full text-gray-400 py-2 hover:text-white transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 