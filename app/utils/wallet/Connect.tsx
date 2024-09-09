'use client'

import { CoinbaseIcon } from '@/public/assets/icon-components/CoinbaseIcon'
import { MetaMaskIcon } from '@/public/assets/icon-components/MetaMaskIcon'
import { WalletIcon } from '@/public/assets/icon-components/Wallet'
import { WalletConnectIcon } from '@/public/assets/icon-components/WalletConnectIcon'
import { ZerionIcon } from '@/public/assets/icon-components/ZerionIcon'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import React from 'react'

export const ConnectButton = () => {
  const { open, close } = useWeb3Modal()

  function handleOpen() {
    try {
      open({ view: 'Networks' })
    }
    catch (_e) {
      open()
    }
  }

  return (
    <button onClick={handleOpen} className="flex h-max items-center rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-red-600">
      <WalletIcon />
      <span className="ml-2">Connect</span>
    </button>
  )
}

const ConnectWalletModal = () => {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white shadow-lg">
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Connect wallet</h2>

        <div className="space-y-3">
          <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200">
            <div className="flex items-center">
              <MetaMaskIcon />
              <span className="ml-2 text-lg">MetaMask</span>
            </div>
            <span className="rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-600">Popular</span>
          </button>

          <button className="flex w-full items-center rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200">
            <ZerionIcon />
            <span className="ml-2 text-lg">Zerion</span>
          </button>

          <button className="flex w-full items-center rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200">
            <CoinbaseIcon />
            <span className="ml-2 text-lg">Coinbase Wallet</span>
          </button>

          <button className="flex w-full items-center rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200">
            <WalletConnectIcon />
            <span className="ml-2 text-lg">WalletConnect</span>
          </button>
        </div>

        <div className="mt-6">
          <a href="#" className="text-red-500 hover:underline">Need help?</a>
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletModal
