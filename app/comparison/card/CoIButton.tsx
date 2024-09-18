import { FC } from 'react'
import { WarningIcon } from '@/public/assets/icon-components/Warning'

interface Props {
  onClick: () => void
}

const ConflictButton: FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="rounded-full border border-red-500 p-2">
      <WarningIcon color="#FF0420" size={20} />
    </button>
  )
}

export default ConflictButton
