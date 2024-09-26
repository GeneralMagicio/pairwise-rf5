"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { PwLogo } from "@/public/assets/icon-components/PairwiseLogo";
import { LandingPart1 } from "../landing/part1";
import { LandingPart2 } from "../landing/part2";
import { LandingPart3 } from "../landing/part3";
import { ConnectButton } from "../utils/wallet/Connect";
import { useAuth } from "../utils/wallet/AuthProvider";

const NoSSRModals = dynamic(() => import("../utils/wallet/Modals"), {
  ssr: false,
});

const Landing = () => {
  const { checkLoginFlow } = useAuth();

  useEffect(() => {
    checkLoginFlow();
  }, [checkLoginFlow]);

  return (
    <div className="w-full bg-[#F2F3F8]">
      <NoSSRModals />
      <div className="mx-auto sm:w-[85%] w-[90%] space-y-8 pt-4">
        <div className="sticky top-0 z-[5] flex h-24 w-full items-center justify-between bg-[#F2F3F8]">
          <span className="lg:size-full md:size-60 sm:size-40 size-32 flex items-center">
            <PwLogo />
          </span>
          <ConnectButton />
        </div>
        <LandingPart1 />
        <LandingPart2 />
        <LandingPart3 />
      </div>
    </div>
  );
};

export default Landing;
