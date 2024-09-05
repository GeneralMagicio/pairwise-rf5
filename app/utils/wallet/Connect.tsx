"use client"

import { CoinbaseIcon } from '@/public/assets/icon-components/CoinbaseIcon';
import { MetaMaskIcon } from '@/public/assets/icon-components/MetaMaskIcon';
import { WalletIcon } from '@/public/assets/icon-components/Wallet';
import { WalletConnectIcon } from '@/public/assets/icon-components/WalletConnectIcon';
import { ZerionIcon } from '@/public/assets/icon-components/ZerionIcon';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';

export const ConnectButton = () => {
  const { open, close } = useWeb3Modal()

  function handleOpen(){
    try{
      open({view: "Networks"});
    } catch(_e){
      open();
    }
  }

  return (
    <button onClick={handleOpen} className="flex h-max items-center bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-red-600 transition duration-300">
      <WalletIcon />
      <span className="ml-2">Connect</span>
    </button>
  );
};

const ConnectWalletModal = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Connect wallet</h2>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
            <div className="flex items-center">
              <MetaMaskIcon />
              <span className="text-lg ml-2">MetaMask</span>
            </div>
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-sm">Popular</span>
          </button>
          
          <button className="w-full flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
            <ZerionIcon />
            <span className="text-lg ml-2">Zerion</span>
          </button>
          
          <button className="w-full flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
            <CoinbaseIcon />
            <span className="text-lg ml-2">Coinbase Wallet</span>
          </button>
          
          <button className="w-full flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
            <WalletConnectIcon />
            <span className="text-lg ml-2">WalletConnect</span>
          </button>
        </div>
        
        <div className="mt-6">
          <a href="#" className="text-red-500 hover:underline">Need help?</a>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;