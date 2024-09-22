import React, { FC } from 'react';
import Image from 'next/image';

interface IGoodRatingModalProps {
  confirm: () => void;
}

const GoodRatingModal: FC<IGoodRatingModalProps> = ({ confirm }) => {
  return (
    <div className="mx-auto rounded-lg bg-white bg-rating-illustration bg-no-repeat p-6 shadow-lg">
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

      <h2 className="mb-4 text-center text-xl font-semibold text-dark-500">
        Great choice!
      </h2>

      <p className="mb-6 text-center text-sm text-gray-400">
        How would you rate the second project?
      </p>

      <button
        onClick={confirm}
        className="mb-2 w-full rounded-md bg-primary py-2 text-white transition duration-300 hover:bg-red-600"
      >
        OK
      </button>
    </div>
  );
};

export default GoodRatingModal;
