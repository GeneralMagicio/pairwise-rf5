import Image from 'next/image'

export const LandingPart3 = () => {
  return (
    <div className="h-[calc(0.65*100vh)] min-h-[calc(0.85*760px)] w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-2 font-inter text-4xl font-bold sl:text-2xl">
          <div>After completion your results</div>
          <span className="mr-2">will be landed back outside of</span>
          <div className="relative mx-1">
            <span className="mr-2">Pairwise to edit your</span>
            <span className="text-primary">Ballot</span>
            <div className="absolute -right-12 -top-6 size-[180px] sl:-right-[6px] sl:-top-2 sl:size-[120px]">
              <Image
                src="/assets/images/accent.svg"
                fill={true}
                alt="scribble"
              />
            </div>
          </div>
        </div>
        <div className="relative size-[620px] sl:h-[450px] sl:w-1/2">
          <Image
            src="assets/images/landing-p2.svg"
            alt="landing part 2"
            fill
          />
        </div>
      </div>
    </div>
  )
}
