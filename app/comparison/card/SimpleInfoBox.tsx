import React, { FC } from 'react'
import { useCollapse } from 'react-collapsed'
import { WebsiteIcon } from '@/public/assets/icon-components/WebsiteIcon'
import { OPIcon } from '@/public/assets/icon-components/OP'
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown'
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp'

interface Props {
  title: string
  description: string
  type: 'contract' | 'link' | 'pricing'
}

const getIcon = (type: Props['type']) => {
  switch (type) {
    case 'contract':
      return <OPIcon />
    case 'link':
      return <WebsiteIcon />
    case 'pricing':
      return null
    default:
      return null
  }
}

const SimpleInfoBox: FC<Props> = ({ description, title, type }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  return (
    <div className="max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon(type)}
          {type === 'pricing'
            ? (
                title
              )
            : (
                <a href={title} className="text-gray-600 hover:underline">
                  {title}
                </a>
              )}
        </div>
        <button
          {...getToggleProps()}
          className="text-sm text-gray-600 hover:underline"
        >
          {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
      </div>
      <section {...getCollapseProps()}>
        <p className="mb-4 text-gray-600">{description}</p>
      </section>
    </div>
  )
}

export default SimpleInfoBox
