import Image from 'next/image'

export const LandingPart2 = () => {
  return (
    <div className="h-[calc(0.65*100vh)] w-full">
      <div className="flex w-full items-center justify-between">
        <div className="relative">
          <Image
            className="relative left-24 top-2 z-[4]"
            src="/assets/images/debridge.svg"
            width={500}
            height={500}
            alt="sample-project"
          />
          <div className="absolute left-24 top-[350px] z-[3] h-[250px] w-[500px] bg-[#17B26A] bg-gradient-to-b from-[#17B26A] to-[#F2F3F8]" />
          <Image
            className="absolute top-28 z-[2]"
            src="/assets/images/archly.svg"
            width={500}
            height={500}
            alt="sample-project"
          />
          <div className="absolute left-0 top-[10px] z-[1] h-[250px] w-[500px] bg-[#F79009] bg-gradient-to-b from-[#F2F3F8] to-[#F79009]" />
          <Image
            className="absolute -bottom-40 -right-40 z-[3]"
            src="/assets/images/op-character2.svg"
            width={240}
            height={160}
            alt="optimism character"
          />
          <div className="absolute -bottom-[200px] -right-40 z-[1] h-[150px] w-[275px] opacity-80 [transform:rotateY(180deg)] ">
            <Image
              src="/assets/images/cloud-vector.svg"
              fill={true}
              alt="cloud-vector"
            />
          </div>
          <div className="absolute -bottom-[120px] left-32 z-[1] h-[75px] w-[150px] opacity-80 ">
            <Image
              src="/assets/images/cloud-vector.svg"
              fill={true}
              alt="cloud-vector"
            />
          </div>
          <div className="absolute -right-[115px] bottom-14 z-[4] size-[50px] rounded-full bg-[#17B26A]" />
          <Image
            className="absolute -bottom-36 left-64 z-[4] opacity-40"
            src="/assets/images/vertical-shade.svg"
            width={45}
            height={800}
            alt="star"
          />
          <Image
            className="absolute -bottom-36 left-80 z-[4] opacity-40"
            src="/assets/images/vertical-shade.svg"
            width={45}
            height={800}
            alt="star"
          />
          <Image
            className="absolute -bottom-36 left-96 z-[4] opacity-40"
            src="/assets/images/vertical-shade.svg"
            width={45}
            height={800}
            alt="star"
          />
          <div className="absolute -right-[140px] bottom-[14px] z-[4] size-[90px]">
            <Image
              src="/assets/images/cursor-click.svg"
              fill={true}
              alt="star"
            />
          </div>
          <div className="absolute -bottom-16 left-60 z-[1] size-[12px] opacity-80">
            <Image src="/assets/images/star.svg" fill={true} alt="star" />
          </div>
          <div className="absolute -bottom-20 right-20 z-[1] size-[16px] opacity-80">
            <Image src="/assets/images/star.svg" fill={true} alt="star" />
          </div>
          <div className="absolute -bottom-24 right-14 z-[1] size-[10px] opacity-80">
            <Image src="/assets/images/star.svg" fill={true} alt="star" />
          </div>

          <div className="absolute left-64 top-32 size-0 shadow-[0_0_1000px_75px_#9E77ED]" />
        </div>
        <div className="flex flex-col gap-2 font-inter text-4xl font-bold">
          <div>Choose the project that you</div>
          <div className="relative mx-1">
            <span className="mr-2">consider had a greater</span>
            <span className="text-primary">impact</span>
            <div className="absolute -right-6 -top-[70px] size-[180px]">
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
  )
}
