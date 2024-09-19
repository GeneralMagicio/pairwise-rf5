import React, { FC } from 'react'
import { useCollapse } from 'react-collapsed'
import { GithubIcon } from '@/public/assets/icon-components/Github'
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp'
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown'
import { TimeIcon } from '@/public/assets/icon-components/Time'
import { DevIcon } from '@/public/assets/icon-components/Dev'
import { CommitIcon } from '@/public/assets/icon-components/Commit'
import { ForkIcon } from '@/public/assets/icon-components/Fork'
import { StarIcon } from '@/public/assets/icon-components/Star'
import { OpenSourceIcon } from '@/public/assets/icon-components/OpenSource'

import { ProjectMetadata } from '../utils/types'

interface Props {
  repo: ProjectMetadata['github'][0]
}

const GithubBox: FC<Props> = ({ repo }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  return (
    <div className="max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2 py-[12px] font-inter">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GithubIcon />
          <a href={repo.url} className="break-all text-gray-700 hover:underline">
            {repo.name || repo.url?.replace('https://' || 'http://', '')}
          </a>
          <div className="flex items-center gap-1 rounded-2xl border bg-blue-background px-2 py-1 text-xs text-blue-foreground">
            <OpenSourceIcon color="#3374DB" />
            <span> Open source </span>
          </div>
        </div>
        <button {...getToggleProps()} className="text-sm text-gray-600">
          {isExpanded
            ? (
                <div className="flex items-center gap-2">
                  <span> Hide metrics </span>
                  <ArrowUpIcon />
                </div>
              )
            : (
                <div className="flex items-center gap-2">
                  <span> View metrics </span>
                  <ArrowDownIcon />
                </div>
              )}
        </button>
      </div>
      <section {...getCollapseProps()}>
        <p className="mb-4 text-gray-600">{repo.description}</p>
        <div className="mb-4 grid grid-cols-3 gap-2 font-inter text-sm font-normal leading-5">
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
            <TimeIcon />
            <span className="text-sm">12 months old</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
            <DevIcon />
            <span className="text-sm">2 full time devs</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
            <DevIcon />
            <span className="text-sm">13 contributors last 6mo</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
            <CommitIcon />
            <span className="text-sm">5 commits last 1mo</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
            <ForkIcon />
            <span className="text-sm">7 forks</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
            <ForkIcon />
            <span className="text-sm">2 forks from top devs</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
            <StarIcon />
            <span className="text-sm">10 stars</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
            <StarIcon />
            <span className="text-sm">8 stars from top devs</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
            <OpenSourceIcon />
            <span className="text-sm">Open source</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GithubBox
