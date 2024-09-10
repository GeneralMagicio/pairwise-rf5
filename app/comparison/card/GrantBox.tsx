import React, { FC } from 'react'
import { useCollapse } from 'react-collapsed'
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown'
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp'
import { WebsiteIcon } from '@/public/assets/icon-components/WebsiteIcon'
import { TimeIcon } from '@/public/assets/icon-components/Time'
import { OPIcon } from '@/public/assets/icon-components/OP'
import { USDIcon } from '@/public/assets/icon-components/Usd'
import { truncate } from '@/app/utils/methods'

interface Props {
  title: string
  money: {
    amount: string
    currency: 'op' | 'usd'
  }
  link?: string
  time?: string
  description: string
}

const GrantBox: FC<Props> = ({ title, link, money, time, description }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  return (
    <div className="max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm">
            {truncate(title, 20)}
          </span>
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm">
              <WebsiteIcon />
              {truncate(link, 25)}
            </a>
          )}

          {money.currency === 'op'
            ? (
                <span className="flex items-center gap-2 text-sm">
                  <OPIcon />
                  {' '}
                  {money.amount}
                </span>
              )
            : (
                <span className="flex items-center gap-2 text-sm">
                  <USDIcon />
                  {' '}
                  {money.amount}
                </span>
              )}
          {time && (
            <span className="flex items-center gap-2 text-sm">
              <TimeIcon />
              {' '}
              {time}
            </span>
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
        <p className="my-3 text-gray-600">{description}</p>
      </section>
    </div>
  )
}

export default GrantBox
