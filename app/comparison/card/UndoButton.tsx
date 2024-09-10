import { UndoIcon } from '@/public/assets/icon-components/Undo'
import React from 'react'

interface UndoButtonProps {
  onClick: () => void
}

const UndoButton: React.FC<UndoButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex size-20 flex-col items-center justify-center rounded-full border-yellow-200 bg-yellow-100 shadow-md
      shadow-yellow-50 transition-colors duration-200 hover:bg-yellow-200"
    >
      <UndoIcon />
      <span className="mt-1 text-xs text-yellow-600">Undo</span>
    </button>
  )
}

export default UndoButton
