import { UndoIcon } from '@/public/assets/icon-components/Undo'
import React from 'react'

interface UndoButtonProps {
  onClick: () => void
}

const UndoButton: React.FC<UndoButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex size-20 flex-col items-center justify-center rounded-full border border-gray-200"
    >
      <UndoIcon color="#636779" />
      <span className="mt-1 text-xs text-gray-400">Undo</span>
    </button>
  )
}

export default UndoButton
