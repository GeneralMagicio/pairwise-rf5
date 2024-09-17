import Lottie from 'lottie-react'
import hourglass from '../../card/modals/hourglass.json'
import React, { FC } from 'react'

const BallotLoading: FC = () => {
  return (
    <div className="mx-auto flex w-96 flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
      <div className="size-32">
        <Lottie
          animationData={hourglass}
          loop={true}
          autoplay={true}
        />
      </div>

      <p className="mt-2 text-center text-gray-600">
        Please wait while we update your ballot...
      </p>
    </div>
  )
}

export default BallotLoading
