import { PwLogo } from "@/public/assets/icon-components/PairwiseLogo";
import ConnectButton from "../utils/wallet/Connect";
import Image from "next/image";

const LandingPart1 = () => {
  return (
    <div className="h-screen -mt-32 flex justify-between items-center">
      <div>
        <div className="flex items-center text-4xl font-bolder">
          <span>Use the</span>
          <div className="relative mx-2">
            <span className="text-red-500">Stars</span>
            <Image
              src="/assets/images/star-vector.png"
              width={45}
              height={45}
              alt="Star"
              className="absolute -top-7 left-2 transform rotate-15"
            />
          </div>
          <div>
            for <br />
          </div>
        </div>
        <div className="text-4xl font-bolder">faster comparisons</div>
      </div>
      <div className="relative">
        <Image
          className="z-[2] top-2 relative"
          src={"/assets/images/ipbi.svg"}
          width={500}
          height={500}
          alt="sample-project"
        />
        <Image
          className="absolute bottom-[92px] -left-60 z-[3]"
          src={"/assets/images/ratings.svg"}
          width={400}
          height={400}
          alt="sample-project"
        />
        <Image
          className="absolute -bottom-32 -left-40 z-[3]"
          src={"/assets/images/op-character.svg"}
          width={275}
          height={200}
          alt="optimism character"
        />
        <div className="absolute top-[10px] -right-12 z-[1] h-[375px] w-[900px] ">
          <Image src={"/assets/images/vector1.png"} fill={true} alt="vector1" />
        </div>
        <div className="absolute -bottom-24 -right-0 z-[1] h-[375px] w-[900px] ">
          <Image src={"/assets/images/vector2.png"} fill={true} alt="vector2" />
        </div>
        <div className="absolute bottom-8 -left-40 z-[1] h-[15px] w-[15px]">
          <Image src={"/assets/images/star.svg"} fill={true} alt="star" />
        </div>
        <div className="absolute bottom-16 -left-28 z-[1] h-[25px] w-[25px]">
          <Image src={"/assets/images/star.svg"} fill={true} alt="star" />
        </div>
        <div className="absolute top-12 -left-16 z-[1] h-[20px] w-[20px] ">
          <Image src={"/assets/images/star.svg"} fill={true} alt="star" />
        </div>
        <div className="absolute top-32 right-64 w-0 h-0 shadow-[0_0_1000px_75px_#9E77ED]" />
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="bg-[#F2F3F8] w-full">
      <div className="w-[85%] pt-16 mx-auto">
        <div className="flex justify-between">
          <PwLogo />
          <ConnectButton />
        </div>
        <LandingPart1/>
      </div>
    </div>
  );
};

export default Landing;
