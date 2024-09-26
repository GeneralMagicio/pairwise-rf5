import Image from "next/image";
import TextBlock from "../components/TextBlock";

export const LandingPart2 = () => {
  return (
    <div className="flex h-[calc(0.65*100vh)] min-h-[calc(0.85*760px)] w-full md:justify-between md:flex-row flex-col-reverse md:gap-40 gap-20 justify-center items-center">
      <div className="relative sl:w-1/2 md:h-[540px] md:w-[600px] w-[100%] h-[360px]">
        <Image src="assets/images/landing-p2.svg" alt="landing part 2" fill />
      </div>
      <div className="flex flex-col gap-2 font-inter text-4xl font-bold sl:text-2xl max-w-[700px]">
        <TextBlock
          mainText="Choose the project that you consider had a greater"
          highlightText="impact"
          description=""
          highlightImage={{
            src: "/assets/images/scribble.svg",
            alt: "scribble",
            styles: "absolute inset-0 -top-3 h-[60px] w-full",
            height: 60,
            width: 100,
            scale: 2.4,
          }}
        />
      </div>
    </div>
  );
};
