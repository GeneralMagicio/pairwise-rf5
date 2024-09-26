import { Dispatch, FC } from 'react';
import Image from 'next/image';
import TextBlock from '../../components/TextBlock';

const IntroView: FC<{ setUserAsVisited: Dispatch<void> }> = ({
  setUserAsVisited,
}) => {
  return (
    <div className="relative flex h-[86vh] w-full items-center justify-end gap-8 px-8 py-2 lg:flex-row flex-col-reverse lg:gap-0 lg:px-0 lg:py-0">
      <div className="left-0 mt-10 flex size-full flex-col items-start md:justify-center justify-end md:mb-0 mb-10 sm:mt-0">
        <div className="ml-0 flex flex-col justify-center gap-16 sm:ml-[20px] lg:ml-[100px] xl:ml-[200px] lg:w-[35%] md:w-[50%] sm:w-[60%] w-[80%]">
          <TextBlock
            mainText="Use the"
            highlightText="Stars"
            description="for faster comparisons"
            highlightImage={{
              src: '/assets/images/star-vector.png',
              alt: 'Star',
              styles: 'absolute -top-12 left-[16px] -z-10',
              width: 70,
              height: 70,
            }}
          />
          <TextBlock
            mainText="Choose the project that you consider had a greater"
            highlightText="impact"
            description=""
            highlightImage={{
              src: '/assets/images/scribble.svg',
              alt: 'scribble',
              styles: 'absolute inset-0 -top-3 -z-10 h-[60px] w-full',
              height: 60,
              width: 100,
              scale: 2.4,
            }}
          />
          <ActionButton onClick={() => setUserAsVisited()} text="Let's do it!" />
        </div>
      </div>

      <Image
        src="/assets/images/intro-page.svg"
        alt="Voting Intro"
        className="absolute right-0 top-0 -z-50"
        width={1167}
        height={1167}
      />
    </div>
  );
};

const ActionButton: FC<{ onClick: () => void, text: string }> = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="mt-10 w-full rounded-lg bg-primary px-8 py-3 text-xl font-bold text-white sm:w-[70%]"
  >
    {text}
  </button>
);

export default IntroView;
