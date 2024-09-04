import Image from "next/image";

export const LandingPart3 = () => {
  return (
    <div className="h-[calc(0.65*100vh)] w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2 text-4xl font-bold font-inter">
          <div>After completion your results</div>
          <span className="mr-2">will be landed back outside of</span>
          <div className="relative mx-1">
            <span className="mr-2">Pairwise to edit your</span>
            <span className="text-primary">Ballot</span>
            <div className="absolute -top-6 -right-12 w-[180px] h-[180px]">
              <Image
                src="/assets/images/accent.svg"
                fill={true}
                alt="scribble"
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <Image src="/assets/images/p3.svg" width={620} height={620} alt="p3" />
        </div>
      </div>
    </div>
  );
};
