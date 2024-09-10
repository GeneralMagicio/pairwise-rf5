import Image from 'next/image'

export const LandingPart1 = () => {
  return (
    <div className="-mt-32 flex h-screen min-h-[768px] items-center justify-between">
      <div className="font-inter text-4xl font-bold">
        <div className="flex items-center">
          <span>Use the</span>
          <div className="relative mx-2">
            <span className="text-primary">Stars</span>
            <Image
              src="/assets/images/star-vector.png"
              width={45}
              height={45}
              alt="Star"
              className="rotate-15 absolute -top-7 left-2"
            />
          </div>
          <div>
            for
            {' '}
            <br />
          </div>
        </div>
        <div>faster comparisons</div>
      </div>
      <div className="relative">
        <Image
          src="assets/images/landing-p1.svg"
          alt="landing part 1"
          width={750}
          height={650}
        />
      </div>
    </div>
  )
}
