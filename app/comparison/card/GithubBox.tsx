import React, { FC } from 'react'
import { useCollapse } from 'react-collapsed'
import { GithubIcon } from '@/public/assets/icon-components/Github'
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp'
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown'
import { ProjectMetadata } from '../utils/types'

interface Props {
  repo: ProjectMetadata['github'][0]
}

const GithubBox: FC<Props> = ({ repo }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  return (
    <div className="max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2 py-[12px]">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GithubIcon />
          <a href={repo.url} className="text-gray-600 hover:underline">
            {repo.name || repo.url}
          </a>
        </div>
        <button
          {...getToggleProps()}
          className="text-sm text-gray-600"
        >
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
        {/* <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
            <TimeIcon />
            <span className="text-sm">12 months old</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
            <DevIcon />
            <span className="text-sm">2 full time devs</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
            <DevIcon />
            <span className="text-sm">13 contributors last 6mo</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
            <CommitIcon />
            <span className="text-sm">5 commits last 1mo</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
            <ForkIcon />
            <span className="text-sm">7 forks</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
            <ForkIcon />
            <span className="text-sm">2 forks from top devs</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
            <StarIcon />
            <span className="text-sm">
              {repo.stars}
              {' '}
              stars
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
            <StarIcon />
            <span className="text-sm">8 stars from top devs</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gray-200 p-2">
            <OpenSourceIcon />
            <span className="text-sm">Open source</span>
          </div>
        </div> */}
        <div className="text-sm text-gray-500">
          <a href="#" className="hover:underline">
            About GitHub metrics
          </a>
        </div>
      </section>
    </div>
  )
}

export default GithubBox
