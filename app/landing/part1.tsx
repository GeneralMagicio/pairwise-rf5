import Image from 'next/image';

export const LandingPart1 = () => {
  return (
    <div className="flex h-[calc(0.85*100vh)] min-h-[768px] items-center justify-between">
      <div className="font-inter text-4xl font-bold sl:text-3xl">
        <div className="flex items-center">
          <span>Use the</span>
          <div className="relative mx-2">
            <span className="text-primary">Stars</span>
            <Image
              src="/assets/images/star-vector.png"
              width={45}
              height={45}
              alt="Star"
              className="absolute -top-7 left-2"
            />
          </div>
          <div>
            for
            <br />
          </div>
        </div>
        <div>faster comparisons</div>
      </div>
      <div className="relative h-[650px] w-[750px] sl:h-[400px] sl:w-1/2">
        <Image
          src="assets/images/landing-p1.svg"
          alt="landing part 1"
          fill
        />
      </div>
    </div>
  );
};
