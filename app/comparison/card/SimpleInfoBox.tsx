import React, { FC } from "react";
import { Protocol } from "./mockData";
import { TimeIcon } from "@/public/assets/icon-components/Time";
import { DevIcon } from "@/public/assets/icon-components/Dev";
import { CommitIcon } from "@/public/assets/icon-components/Commit";
import { ForkIcon } from "@/public/assets/icon-components/Fork";
import { StarIcon } from "@/public/assets/icon-components/Star";
import { OpenSourceIcon } from "@/public/assets/icon-components/OpenSource";
import { useCollapse } from "react-collapsed";
import { WebsiteIcon } from "@/public/assets/icon-components/WebsiteIcon";
import { OPIcon } from "@/public/assets/icon-components/OP";
import { ArrowDownIcon } from "@/public/assets/icon-components/ArrowDown";
import { ArrowUpIcon } from "@/public/assets/icon-components/ArrowUp";

interface Props {
  title: string;
  description: string;
  type: "contract" | "link" | "pricing";
}

const getIcon = (type: Props["type"]) => {
  switch (type) {
    case "contract":
      return <OPIcon />;
    case "link":
      return <WebsiteIcon />;
    case "pricing":
      return null;
    default:
      return null;
  }
};

const SimpleInfoBox: FC<Props> = ({ description, title, type }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 max-w-2xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 items-center">
          {getIcon(type)}
          {type === "pricing" ? (
            title
          ) : (
            <a href={title} className="text-gray-600 hover:underline">
              {title}
            </a>
          )}
        </div>
        <button
          {...getToggleProps()}
          className="text-gray-600 text-sm hover:underline"
        >
          {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
      </div>
      <section {...getCollapseProps()}>
        <p className="text-gray-600 mb-4">{description}</p>
      </section>
    </div>
  );
};

export default SimpleInfoBox;
