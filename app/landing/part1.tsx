import Image from 'next/image';
import TextBlock from '../components/TextBlock';

export const LandingPart1 = () => {
  return (
    <div className="flex h-[calc(0.90*100vh)] min-h-[768px] md:justify-between md:flex-row flex-col md:gap-0 gap-40 justify-center">
      <div className="md:max-w-[500px] max-w-[400px] font-inter text-4xl font-bold sl:text-3xl flex flex-col justify-center">
        <TextBlock
          mainText="Use the"
          highlightText="Stars"
          description="for faster comparisons"
          highlightImage={{
            src: '/assets/images/star-vector.png',
            alt: 'Star',
            styles: 'absolute -top-7 left-2',
            width: 45,
            height: 45,
          }}
        />
      </div>
      <div className="relative md:h-[650px] md:w-[750px] w-[100%]">
        <Image
          src="assets/images/landing-p1.svg"
          alt="landing part 1"
          width={750}
          height={650}
        />
      </div>
    </div>
  );
};
