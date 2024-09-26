import Image from "next/image";
import TextBlock from "../components/TextBlock";

export const LandingPart3 = () => {
  return (
    <div className="flex h-[calc(0.65*100vh)] min-h-[calc(0.85*760px)] w-full md:justify-between md:flex-row flex-col md:gap-40 gap-20 justify-center items-center">
      <div className="flex flex-col gap-2 font-inter text-4xl font-bold sl:text-2xl max-w-[700px]">
        <TextBlock
          mainText="After completion your results will be landed back outside of Pairwise to edit your"
          highlightText="Ballot"
          description=""
          highlightImage={{
            src: "/assets/images/accent.svg",
            alt: "accent",
            styles: "absolute -right-12 top-8",
            height: 60,
            width: 100,
            scale: 2.1,
          }}
        />
      </div>
      <div className="relative md:size-[620px] h-[450px] w-[100%]">
        <Image src="assets/images/landing-p3.svg" alt="landing part 2" fill />
      </div>
    </div>
  );
};
