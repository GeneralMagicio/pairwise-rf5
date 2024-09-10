import { PwLogo } from '@/public/assets/icon-components/PairwiseLogo'
import { ConnectButton } from '../utils/wallet/Connect'
import { LandingPart1 } from './part1'
import { LandingPart2 } from './part2'
import { LandingPart3 } from './part3'

const Landing = () => {
  return (
    <div className="w-full bg-[#F2F3F8]">
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
