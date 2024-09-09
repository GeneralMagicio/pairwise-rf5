import React from 'react'
import Image from 'next/image'

interface HeaderProps {
  progress: number
  category: string
  question: string
}

const OPCharacter: React.FC = () => (
  <Image src="assets/images/op-character3.svg" alt="op character" width={60} height={48} />
)

const Header: React.FC<HeaderProps> = ({ progress, category, question }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-12 py-4">

        <div className="flex items-center justify-between bg-white px-4 py-2">
          <div className="flex items-center">
            <OPCharacter />
            <span className="ml-2 text-lg font-bold italic text-primary">IMPACT = PROFIT</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="text-xl font-semibold">{question}</h2>
        </div>
        <div className="flex items-center">
          <span className="mr-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
            {category}
          </span>
          <div className="flex items-center rounded-full bg-gray-100 px-3 py-1">
            <span className="max-w-[150px] truncate text-sm text-gray-600">
              0x34524...8g7tc5f
            </span>
            <svg className="ml-1 size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="h-2 bg-red-100">
        <div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
        >
        </div>
      </div>
    </div>
  )
}

export default Header
