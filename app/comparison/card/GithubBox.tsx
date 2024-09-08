import React, { FC } from "react";
import { Protocol } from "./mockData";
import { TimeIcon } from "@/public/assets/icon-components/Time";
import { DevIcon } from "@/public/assets/icon-components/Dev";
import { CommitIcon } from "@/public/assets/icon-components/Commit";
import { ForkIcon } from "@/public/assets/icon-components/Fork";
import { StarIcon } from "@/public/assets/icon-components/Star";
import { OpenSourceIcon } from "@/public/assets/icon-components/OpenSource";
import { useCollapse } from "react-collapsed";
import { GithubIcon } from "@/public/assets/icon-components/Github";
import { ArrowUpIcon } from "@/public/assets/icon-components/ArrowUp";
import { ArrowDownIcon } from "@/public/assets/icon-components/ArrowDown";

interface Props {
  repo: Protocol["repos"][0];
}

const GithubBox: FC<Props> = ({ repo }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-2 py-[12px] max-w-2xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 items-center">
          <GithubIcon />
          <a href={repo.url} className="text-gray-600 hover:underline">
            github.com/placeholder/ipsum_1
          </a>
        </div>
        <button
          {...getToggleProps()}
          className="text-gray-600 text-sm"
        >
          {isExpanded ? (
            <div className="flex gap-2 items-center">
              <span> Hide metrics </span>
              <ArrowUpIcon />
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span> View metrics </span>
              <ArrowDownIcon />
            </div>
          )}
        </button>
      </div>
      <section {...getCollapseProps()}>
        <p className="text-gray-600 mb-4">{repo.description}</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="gap-2 bg-gray-200 p-2 rounded-md flex items-center">
            <TimeIcon />
            <span className="text-sm">12 months old</span>
          </div>
          <div className="gap-2 bg-gray-200 p-2 rounded-md flex items-center">
            <DevIcon />
            <span className="text-sm">2 full time devs</span>
          </div>
          <div className="gap-2 bg-gray-200 p-2 rounded-md flex items-center">
            <DevIcon />
            <span className="text-sm">13 contributors last 6mo</span>
          </div>
          <div className="gap-2 bg-gray-200 p-2 rounded-md flex items-center">
            <CommitIcon />
            <span className="text-sm">5 commits last 1mo</span>
          </div>
          <div className="gap-2 bg-gray-200 p-2 rounded-md flex items-center">
            <ForkIcon />
            <span className="text-sm">7 forks</span>
          </div>
          <div className="gap-2 bg-gray-200 p-2 rounded-md flex items-center">
            <ForkIcon />
            <span className="text-sm">2 forks from top devs</span>
          </div>
          <div className="gap-2 bg-gray-200 p-2 rounded-md flex items-center">
            <StarIcon />
            <span className="text-sm">{repo.stars} stars</span>
          </div>
          <div className="gap-2 bg-gray-200 p-2 rounded-md flex items-center">
            <StarIcon />
            <span className="text-sm">8 stars from top devs</span>
          </div>
          <div className="gap-2 bg-gray-200 p-2 rounded-md flex items-center">
            <OpenSourceIcon />
            <span className="text-sm">Open source</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <a href="#" className="hover:underline">
            About GitHub metrics
          </a>
        </div>
      </section>
    </div>
  );
};

export default GithubBox;
