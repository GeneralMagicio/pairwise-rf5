import Image from 'next/image'

export const LandingPart1 = () => {
  return (
    <div className="-mt-32 flex h-screen items-center justify-between">
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
          className="relative top-2 z-[2]"
          src="/assets/images/ipbi.svg"
          width={500}
          height={500}
          alt="sample-project"
        />
        <Image
          className="absolute -left-60 bottom-[92px] z-[3]"
          src="/assets/images/ratings.svg"
          width={400}
          height={400}
          alt="sample-project"
        />
        <Image
          className="absolute -bottom-32 -left-40 z-[3]"
          src="/assets/images/op-character.svg"
          width={275}
          height={200}
          alt="optimism character"
        />
        <div className="absolute -right-12 top-[10px] z-[1] h-[375px] w-[900px] ">
          <Image src="/assets/images/vector1.png" fill={true} alt="vector1" />
        </div>
        <div className="absolute -bottom-24 -right-0 z-[1] h-[375px] w-[900px] ">
          <Image src="/assets/images/vector2.png" fill={true} alt="vector2" />
        </div>
        <div className="absolute -left-40 bottom-8 z-[1] size-[15px]">
          <Image src="/assets/images/star.svg" fill={true} alt="star" />
        </div>
        <div className="absolute -left-28 bottom-16 z-[1] size-[25px]">
          <Image src="/assets/images/star.svg" fill={true} alt="star" />
        </div>
        <div className="absolute -left-16 top-12 z-[1] size-[20px] ">
          <Image src="/assets/images/star.svg" fill={true} alt="star" />
        </div>
        <div className="absolute right-64 top-32 size-0 shadow-[0_0_1000px_75px_#9E77ED]" />
      </div>
    </div>
  )
}
