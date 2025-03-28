import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { MetaMaskProvider } from './contexts/MetaMaskContext';

function App() {
  return (
    <BrowserRouter>
      <MetaMaskProvider>
        <AppRoutes />
      </MetaMaskProvider>
    </BrowserRouter>
  );
}

export default App;
