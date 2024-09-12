'use client'

import React from 'react'
import Modal from '../Modal'
import ConnectLoading from './modals/ConnectLoading'
import NotBadgeHolder from './modals/NotBhModal'
import SignInWithWallet from './modals/SignInModal'
import { LogginToPwBackendState, useAuth } from './AuthProvider'
import { usePathname } from 'next/navigation'

export default function Modals() {
  const path = usePathname()
  const { loggedToAgora, loggedToPw, loginInProgress } = useAuth()

  const notBhOpen = typeof loggedToAgora === 'object'
    && loggedToAgora.isBadgeholder === false && path.includes('main')

  const signInModalOpen = loggedToAgora === 'error' || loggedToPw === LogginToPwBackendState.Error
  return (
    <>
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
  )
}
