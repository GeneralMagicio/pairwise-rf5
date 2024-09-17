import Image from 'next/image'
import React from 'react'

interface UnlockBallotProps {
  onClick: () => void
}

const BallotError: React.FC<UnlockBallotProps> = ({ onClick }) => {
  return (
    <div className="mx-auto w-[96] overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="p-10 text-center">
        <Image
          src="/assets/images/ballot-error.png"
          alt="Celebration"
          width={320}
          height={250}
          className="mx-auto mb-6"
        />
        <h2 className="mb-2 text-xl font-medium">
          Error updating ballot!
        </h2>
        <p className="mb-6 text-gray-600">
          We encountered a problem updating your ballot.
          Please retry updating.
        </p>
        <button
          onClick={onClick}
          className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-white transition duration-300 ease-in-out hover:bg-red-600"
        >
          Retry ballot update
        </button>
      </div>
    </div>
  )
}

export default BallotError
