'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';
import Modal from '../Modal';
import ConnectLoading from './modals/ConnectLoading';
import NotBadgeHolder from './modals/NotBhModal';
import SignInWithWallet from './modals/SignInModal';
import { LogginToPwBackendState, useAuth } from './AuthProvider';
import NewWalletModal from './modals/NewWalletModal';

export default function Modals() {
  const path = usePathname();
  const {address} = useAccount();
  const { loggedToAgora, loggedToPw, loginInProgress, loginAddress, setLoginAddress, doLoginFlow, signOut } = useAuth();

  const notBhOpen = typeof loggedToAgora === 'object'
    && loggedToPw === LogginToPwBackendState.LoggedIn && loggedToAgora.isBadgeholder === false && !path.includes('comparison');

  const signInModalOpen = (address ?? false) && (loggedToAgora === 'error' || loggedToPw === LogginToPwBackendState.Error);

  const handleNewWalletCancel = () => {
    setLoginAddress({...loginAddress, confirmed: true});
  };

  const handleNewWalletSignIn = () => {
    setLoginAddress({value: address, confirmed: true});
    signOut(false);
    doLoginFlow();
  };

  return (
    <>
      <Modal isOpen={loginAddress.value !== address && loginAddress.confirmed === false} onClose={() => {}}>
        <NewWalletModal onSignIn={handleNewWalletSignIn} onCancel={handleNewWalletCancel}/>
      </Modal>
      <Modal isOpen={notBhOpen} onClose={() => {}}>
        {notBhOpen && <NotBadgeHolder />}
      </Modal>
      <Modal isOpen={signInModalOpen} onClose={() => {}}>
        {signInModalOpen && <SignInWithWallet />}
      </Modal>
      <Modal isOpen={loginInProgress || false} onClose={() => {}}>
        {loginInProgress && <ConnectLoading />}
      </Modal>
    </>
  );
}
