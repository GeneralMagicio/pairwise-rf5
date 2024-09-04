import Image from "next/image";

export const LandingPart2 = () => {
  return (
    <div className="h-[calc(0.65*100vh)] w-full">
      <div className="flex justify-between items-center w-full">
        <div className="relative">
          <Image
            className="z-[4] top-2 left-24 relative"
            src={"/assets/images/debridge.svg"}
            width={500}
            height={500}
            alt="sample-project"
          />
          <div className="z-[3] absolute w-[500px] h-[250px] top-[350px] left-24 bg-[#17B26A] bg-gradient-to-b from-[#17B26A] to-[#F2F3F8]" />
          <Image
            className="z-[2] absolute top-28"
            src={"/assets/images/archly.svg"}
            width={500}
            height={500}
            alt="sample-project"
          />
          <div className="z-[1] absolute w-[500px] h-[250px] top-[10px] left-0 bg-[#F79009] bg-gradient-to-b from-[#F2F3F8] to-[#F79009]" />
          <Image
            className="z-[5] absolute -bottom-40 -right-40 z-[3]"
            src={"/assets/images/op-character2.svg"}
            width={240}
            height={160}
            alt="optimism character"
          />
          <div className="absolute z-[4] [transform:rotateY(180deg)] opacity-80 -bottom-[200px] -right-40 z-[1] h-[150px] w-[275px] ">
            <Image
              src={"/assets/images/cloud-vector.svg"}
              fill={true}
              alt="cloud-vector"
            />
          </div>
          <div className="absolute z-[4] opacity-80 -bottom-[120px] left-32 z-[1] h-[75px] w-[150px] ">
            <Image
              src={"/assets/images/cloud-vector.svg"}
              fill={true}
              alt="cloud-vector"
            />
          </div>
          <div className="absolute z-[4] bg-[#17B26A] bottom-14 -right-[115px] rounded-full h-[50px] w-[50px]" />
          <Image
            className="absolute opacity-40 z-[4] -bottom-36 left-64"
            src={"/assets/images/vertical-shade.svg"}
            width={45}
            height={800}
            alt="star"
          />
          <Image
            className="absolute opacity-40 z-[4] -bottom-36 left-80"
            src={"/assets/images/vertical-shade.svg"}
            width={45}
            height={800}
            alt="star"
          />
          <Image
            className="absolute opacity-40 z-[4] -bottom-36 left-96"
            src={"/assets/images/vertical-shade.svg"}
            width={45}
            height={800}
            alt="star"
          />
          <div className="absolute z-[4] bottom-[14px] -right-[140px] h-[90px] w-[90px]">
            <Image
              src={"/assets/images/cursor-click.svg"}
              fill={true}
              alt="star"
            />
          </div>
          <div className="absolute z-[4] opacity-80 -bottom-16 left-60 z-[1] h-[12px] w-[12px]">
            <Image src={"/assets/images/star.svg"} fill={true} alt="star" />
          </div>
          <div className="absolute z-[4] opacity-80 -bottom-20 right-20 z-[1] h-[16px] w-[16px]">
            <Image src={"/assets/images/star.svg"} fill={true} alt="star" />
          </div>
          <div className="absolute z-[4] opacity-80 -bottom-24 right-14 z-[1] h-[10px] w-[10px]">
            <Image src={"/assets/images/star.svg"} fill={true} alt="star" />
          </div>

          <div className="absolute top-32 left-64 w-0 h-0 shadow-[0_0_1000px_75px_#9E77ED]" />
        </div>
        <div className="flex flex-col gap-2 text-4xl font-bold font-inter">
          <div>Choose the project that you</div>
          <div className="relative mx-1">
            <span className="mr-2">consider had a greater</span>
            <span className="text-primary">impact</span>
            <div className="absolute -top-[70px] -right-6 w-[180px] h-[180px]">
              <Image
                src="/assets/images/scribble.svg"
                fill={true}
                alt="scribble"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
