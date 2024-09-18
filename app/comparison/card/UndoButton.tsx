import { UndoIcon } from '@/public/assets/icon-components/Undo'
import React from 'react'

interface UndoButtonProps {
  disabled?: boolean
  onClick: () => void
}

const UndoButton: React.FC<UndoButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex size-16 md:size-20 flex-col items-center justify-center rounded-full border border-gray-200"
      disabled={disabled}
    >
      <UndoIcon color="#636779" />
      <span className="mt-1 text-xs text-gray-400">Undo</span>
    </button>
  )
}

export default UndoButton
