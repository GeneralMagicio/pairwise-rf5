import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";

const IntroView: FC<{ setIsFirstTime: Dispatch<SetStateAction<boolean>> }> = ({
  setIsFirstTime,
}) => {
  return (
    <div className="relative flex w-full items-center justify-end gap-8 px-8 py-2 h-[86vh]">
      <div className="flex items-start justify-center left-0 w-[100%] h-full flex-col mt-10 sm:mt-0">
        <div className="flex flex-col justify-center gap-16 ml-[0px] sm:ml-[20px] lg:ml-[100px] xl:ml-[200px]">
          <p className="xl:text-4xl text-3xl font-bold text-start text-dark-500 w-[80%] sm:w-[35%]">
            Use the{" "}
            <span className="relative">
              <img
                src="/assets/images/star-vector.png"
                alt="Star"
                className="absolute -top-12 left-[16px]"
              />
              <span className="text-primary">Stars</span>
            </span>{" "}
            for faster comparisons
          </p>
          <p className="xl:text-4xl text-3xl font-bold text-start text-dark-500 md:w-[55%] w-[80%]">
            Choose the project that you consider had a greater{" "}
            <span className="relative inline-block">
              <span className="relative text-primary">impact</span>
              <Image
                src="/assets/images/scribble.png"
                alt="scribble"
                height={60}
                width={100}
                className="absolute inset-0 h-[60px] w-full -z-10 -top-3"
                style={{ transform: "scale(1.7)" }}
              />
            </span>{" "}
          </p>
          <button
            onClick={() => setIsFirstTime(false)}
            className="bg-primary text-white text-xl font-bold py-3 px-8 mt-10 rounded-lg sm:w-[42%] w-[100%]"
          >
            Let's do it!
          </button>
        </div>
      </div>
      <img
        src="/assets/images/intro-page.svg"
        alt="Voting Intro"
        className="absolute right-0 top-0"
      />
    </div>
  );
};
export default IntroView;
