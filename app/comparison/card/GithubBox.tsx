import React, { FC } from "react";
import { Protocol } from "./mockData";
import { TimeIcon } from "@/public/assets/icon-components/Time";
import { DevIcon } from "@/public/assets/icon-components/Dev";
import { CommitIcon } from "@/public/assets/icon-components/Commit";
import { ForkIcon } from "@/public/assets/icon-components/Fork";
import { StarIcon } from "@/public/assets/icon-components/Star";
import { OpenSourceIcon } from "@/public/assets/icon-components/OpenSource";
import { useCollapse } from "react-collapsed";

interface Props {
  repo: Protocol["repos"][0];
}

const GithubBox: FC<Props> = ({ repo }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 max-w-2xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10c0-5.523-4.477-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
          <a href={repo.url} className="text-blue-600 hover:underline">
            github.com/placeholder/ipsum_1
          </a>
        </div>
        <button
          {...getToggleProps()}
          className="text-gray-600 text-sm hover:underline"
        >
          {isExpanded ? `Hide metrics ^` : "View metrics v"}
        </button>
      </div>
      <section {...getCollapseProps()}>
        <p className="text-gray-600 mb-4">{repo.description}</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="gap-2 bg-gray-100 p-2 rounded-md flex items-center">
            <TimeIcon />
            <span className="text-sm">12 months old</span>
          </div>
          <div className="gap-2 bg-gray-100 p-2 rounded-md flex items-center">
            <DevIcon />
            <span className="text-sm">2 full time devs</span>
          </div>
          <div className="gap-2 bg-gray-100 p-2 rounded-md flex items-center">
            <DevIcon />
            <span className="text-sm">13 contributors last 6mo</span>
          </div>
          <div className="gap-2 bg-gray-100 p-2 rounded-md flex items-center">
            <CommitIcon />
            <span className="text-sm">5 commits last 1mo</span>
          </div>
          <div className="gap-2 bg-gray-100 p-2 rounded-md flex items-center">
            <ForkIcon />
            <span className="text-sm">7 forks</span>
          </div>
          <div className="gap-2 bg-gray-100 p-2 rounded-md flex items-center">
            <ForkIcon />
            <span className="text-sm">2 forks from top devs</span>
          </div>
          <div className="gap-2 bg-gray-100 p-2 rounded-md flex items-center">
            <StarIcon />
            <span className="text-sm">{repo.stars} stars</span>
          </div>
          <div className="gap-2 bg-gray-100 p-2 rounded-md flex items-center">
            <StarIcon />
            <span className="text-sm">8 stars from top devs</span>
          </div>
          <div className="gap-2 bg-gray-100 p-2 rounded-md flex items-center">
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
