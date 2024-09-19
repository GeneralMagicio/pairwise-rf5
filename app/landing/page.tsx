'use client'

import { PwLogo } from '@/public/assets/icon-components/PairwiseLogo'
import { LandingPart1 } from '../landing/part1'
import { LandingPart2 } from '../landing/part2'
import { LandingPart3 } from '../landing/part3'
import { ConnectButton } from '../utils/wallet/Connect'
import dynamic from 'next/dynamic'
import { useAuth } from '../utils/wallet/AuthProvider'
import { useEffect } from 'react'

const NoSSRModals = dynamic(() => import('../utils/wallet/Modals'), { ssr: false })

const Landing = () => {
  const { checkLoginFlow } = useAuth()

  useEffect(() => {
    checkLoginFlow()
  }, [checkLoginFlow])

  return (
    <div className="w-full bg-[#F2F3F8]">
      <NoSSRModals />
      <div className="mx-auto w-[85%] space-y-8 pt-4">
        <div className="sticky top-0 bg-[#F2F3F8] h-24 w-full flex items-center justify-between z-[5]">
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
