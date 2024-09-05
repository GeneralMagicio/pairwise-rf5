import { PwLogo } from "@/public/assets/icon-components/PairwiseLogo";
import ConnectWalletModal, {ConnectButton} from "../utils/wallet/Connect";
import Image from "next/image";
import { LandingPart1 } from "./part1";
import { LandingPart2 } from "./part2";
import { LandingPart3 } from "./part3";

const Landing = () => {
  return (
    <div className="bg-[#F2F3F8] w-full">
      <div className="w-[85%] pt-16 mx-auto">
        <div className="flex justify-between">
          <PwLogo />
          <ConnectButton />
        </div>
        <ConnectWalletModal/>
        <LandingPart1/>
        <LandingPart2/>
        <LandingPart3/>
      </div>
    </div>
  );
};

export default Landing;
