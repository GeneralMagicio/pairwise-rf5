import React, { FC } from 'react'

interface Props {
  imageUrl: string
  title: string
  onClick: () => void
}

const VoteButton: FC<Props> = ({ imageUrl, title, onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-6 transition-colors duration-200 hover:bg-gray-100">
      <img src={imageUrl} alt="" className="mr-2 size-10 rounded-lg" />
      <span className="font-medium text-gray-800">{title}</span>
    </button>
  )
}

export default VoteButton
