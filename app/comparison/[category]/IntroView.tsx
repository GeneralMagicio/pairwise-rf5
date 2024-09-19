import Image from 'next/image'
import { Dispatch, FC, SetStateAction } from 'react'

const IntroView: FC<{ setIsFirstTime: Dispatch<SetStateAction<boolean>> }> = ({
  setIsFirstTime,
}) => {
  return (
    <div className="relative flex h-[86vh] w-full items-center justify-end gap-8 px-8 py-2">
      <div className="left-0 mt-10 flex size-full flex-col items-start justify-center sm:mt-0">
        <div className="ml-0 flex flex-col justify-center gap-16 sm:ml-[20px] lg:ml-[100px] xl:ml-[200px]">
          <p className="w-4/5 text-start text-3xl font-bold text-dark-500 sm:w-[35%] xl:text-4xl">
            Use the
            {' '}
            <span className="relative">
              <Image
                src="/assets/images/star-vector.png"
                alt="Star"
                className="absolute -top-12 left-[16px] -z-10"
                width={70}
                height={70}
              />
              <span className="text-primary">Stars</span>
            </span>
            {' '}
            for faster comparisons
          </p>
          <p className="w-4/5 text-start text-3xl font-bold text-dark-500 md:w-[55%] xl:text-4xl">
            Choose the project that you consider had a greater
            {' '}
            <span className="relative inline-block">
              <span className="relative text-primary">impact</span>
              <Image
                src="/assets/images/scribble.svg"
                alt="scribble"
                height={60}
                width={100}
                className="absolute inset-0 -top-3 -z-10 h-[60px] w-full"
                style={{ transform: 'scale(2.4)' }}
              />
            </span>
            {' '}
          </p>
          <button
            onClick={() => setIsFirstTime(false)}
            className="mt-10 w-full rounded-lg bg-primary px-8 py-3 text-xl font-bold text-white sm:w-[42%]"
          >
            Let's do it!
          </button>
        </div>
      </div>
      <Image
        src="/assets/images/intro-page.svg"
        alt="Voting Intro"
        className="absolute right-0 top-0"
        width={1167}
        height={1167}
      />
    </div>
  )
}
export default IntroView
