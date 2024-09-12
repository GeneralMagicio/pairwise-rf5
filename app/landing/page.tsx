'use client'

import { PwLogo } from '@/public/assets/icon-components/PairwiseLogo'
import { ConnectButton } from '../utils/wallet/Connect'
import { LandingPart1 } from './part1'
import { LandingPart2 } from './part2'
import { LandingPart3 } from './part3'
import { useAuth } from '../utils/wallet/AuthProvider'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '../utils/Modal'
import NotBadgeHolder from '../utils/wallet/modals/NotBhModal'
import NewWalletModal from '../utils/wallet/modals/NewWalletModal'

const Landing = () => {
  const { loggedToPw, loggedToAgora } = useAuth()
  const [notBhOpen, setNotBhOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (typeof loggedToAgora === 'object') {
      const { category } = loggedToAgora
      console.log('the payload', loggedToAgora)
      if (loggedToAgora.isBadgeholder === false) {
        console.log('Reached here?')
        setNotBhOpen(true)
      }
    }
  }, [loggedToAgora, router])

  return (
    <div className="w-full bg-[#F2F3F8]">
      <Modal isOpen={notBhOpen} onClose={() => setNotBhOpen(false)}>
        <NewWalletModal />
      </Modal>
      <div className="mx-auto w-[85%] space-y-8 pt-16">
        <div className="flex items-center justify-between">
          <PwLogo />
          <ConnectButton />
        </div>
        <LandingPart1 />
        <LandingPart2 />
        <LandingPart3 />
      </div>
    </div>
  )
}

export default Landing
