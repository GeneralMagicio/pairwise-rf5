import React, { FC } from "react";
import Image from "next/image";
import { StarIcon } from "@/public/assets/icon-components/Star";

interface IGoodRatingModalProps {
  confirm: () => void;
}

interface IStarRatingProps {
  color: string;
  numRated: number;
}

const StarRating: FC<IStarRatingProps> = ({ color, numRated }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        color={index < numRated ? color : "#D0D5DD"}
        size={20}
      />
    ))}
  </div>
);

const ratingOptions = [
  { color: "#FF1D1D", numRated: 1, label: "No impact on the OP stack" },
  { color: "#FF8C22", numRated: 2, label: "Low impact on the OP stack" },
  { color: "#F8CE00", numRated: 3, label: "Medium impact on the OP stack" },
  { color: "#46C34C", numRated: 4, label: "High impact on the OP stack" },
  { color: "#479F78", numRated: 5, label: "Very High impact on the OP stack" },
];

const GoodRatingModal: FC<IGoodRatingModalProps> = ({ confirm }) => (
  <div className="mx-auto rounded-lg bg-white bg-good-rating bg-no-repeat p-6 shadow-lg">
    <div className="mb-4 flex justify-center">
      <div className="rounded-full p-2">
        <Image
          src="/assets/images/op-character5.svg"
          alt="Rating Illustration"
          width={160}
          height={180}
        />
      </div>
    </div>

    <h2 className="mb-6 text-center text-xl font-semibold text-dark-500">
      How would you rate the second project?
    </h2>

    <div className="flex flex-col text-gray-400 text-sm mb-8 justify-center gap-6 font-normal font-inter px-2">
      {ratingOptions.map(({ color, numRated, label }, index) => (
        <div
          key={index}
          className="flex items-center gap-4 md:flex-row flex-col-reverse"
        >
          <StarRating color={color} numRated={numRated} />
          <label htmlFor="good">{label}</label>
        </div>
      ))}
    </div>

    <button
      onClick={confirm}
      className="mb-2 w-full rounded-md bg-primary py-2 text-white transition duration-300 hover:bg-red-600"
    >
      OK
    </button>
  </div>
);

export default GoodRatingModal;
