import React from "react";
import { useState } from "react";
import { useMetaMask } from '../contexts/MetaMaskContext';

const NavBar = () => {
  const [open, isOpen] = useState(false);
  const { account, isConnected, connect, disconnect } = useMetaMask();

  const checking = () => {
    isOpen(!open);
  }

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
    <nav className="bg-black p-4">
      <div className="w-full max-w-[1120px] text-white flex mx-auto justify-between items-center">
        <h1 className="p-6 text-xl"><a href="/">AyBiouss</a></h1>

      {/* Desktop */}
        <div className="hidden md:flex space-x-4">
          <a className="block text-white p-2 hover:text-gold" href="blog">Blog</a>
          <a className="block text-white p-2 hover:text-gold" href="videos">Videos</a>
          <a className="block text-white p-2 hover:text-gold" href="courses">Courses</a>
          {isConnected ? (
            <div className="flex items-center space-x-4">
              <span className="text-white p-2">{formatAddress(account)}</span>
              <button 
                onClick={disconnect}
                className="text-white p-2 bg-red-600 rounded hover:bg-red-700"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={connect}
              className="text-white p-2 bg-gold rounded hover:text-black"
            >
              Connect Wallet
            </button>
          )}
        </div>

      {/* Mobile */}
        <div className="md:hidden">
          <button onClick={checking} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className={`${open ? 'block' : 'hidden'} md:hidden fixed top-0 left-0 h-screen bg-black w-full z-10`}>
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl">Gamified Learning Game</h1>
            <button onClick={checking} className="text-white">
              <svg className="right-0 top-0" fill="#ffffff" width="20px" height="20px" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                  <title/>
                  <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
                </g>
              </svg>
            </button>
          </div>
          <a className="block text-white m-2 p-2 hover:text-gold" href="blog">Blog</a>
          <a className="block text-white m-2 p-2 hover:text-gold" href="videos">Videos</a>
          <a className="block text-white m-2 p-2 hover:text-gold" href="courses">Courses</a>
          {isConnected ? (
            <div className="m-2">
              <span className="block text-white p-2">{formatAddress(account)}</span>
              <button 
                onClick={disconnect}
                className="w-full text-white p-2 bg-red-600 rounded hover:bg-red-700"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={connect}
              className="w-full m-2 text-white p-2 bg-gold rounded hover:text-black"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
    </>
  );
};

export default NavBar;