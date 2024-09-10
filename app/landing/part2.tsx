import Image from 'next/image'

export const LandingPart2 = () => {
  return (
    <div className="h-[calc(0.65*100vh)] min-h-[calc(0.65*760px)] w-full">
      <div className="flex w-full items-center justify-between">
        <div className="relative">
          <Image
            src="assets/images/landing-p2.svg"
            alt="landing part 1"
            width={650}
            height={580}
          />
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
