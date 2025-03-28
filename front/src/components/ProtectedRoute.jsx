import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMetaMask } from '../contexts/MetaMaskContext';

const ProtectedRoute = ({ children }) => {
  const { isConnected } = useMetaMask();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 