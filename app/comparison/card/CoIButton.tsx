import { FC } from 'react'

interface Props {
  onClick: () => void
}

const ConflictButton: FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="rounded-lg border border-red-500 bg-white px-4 py-6 font-semibold text-red-500 transition-colors duration-300 hover:bg-red-100">
      Conflict of interest
    </button>
  )
}

export default ConflictButton
