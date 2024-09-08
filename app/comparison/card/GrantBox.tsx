import React, { FC } from "react";
import { useCollapse } from "react-collapsed";
import { ArrowDownIcon } from "@/public/assets/icon-components/ArrowDown";
import { ArrowUpIcon } from "@/public/assets/icon-components/ArrowUp";
import { WebsiteIcon } from "@/public/assets/icon-components/WebsiteIcon";
import { TimeIcon } from "@/public/assets/icon-components/Time";
import { OPIcon } from "@/public/assets/icon-components/OP";
import { USDIcon } from "@/public/assets/icon-components/Usd";

interface Props {
  title: string;
  money: {
    amount: string;
    currency: "op" | "usd";
  };
  link?: string;
  time?: string;
  description: string;
}

const GrantBox: FC<Props> = ({ title, link, money, time, description }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-2 max-w-2xl">
      <div className="flex items-center justify-between py-1">
        <div className="flex gap-6 items-center">
          <span className="text-sm"> {title} </span>
          {link && (
            <span className="flex gap-2 text-sm items-center">
              <WebsiteIcon /> {link}
            </span>
          )}

          {money.currency === "op" ? (
            <span className="flex gap-2 text-sm items-center">
              <OPIcon /> {money.amount}
            </span>
          ) : (
            <span className="flex gap-2 text-sm items-center">
              <USDIcon /> {money.amount}
            </span>
          )}
          {time && (
            <span className="flex gap-2 text-sm items-center">
              <TimeIcon /> {time}
            </span>
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
        <p className="text-gray-600 my-3">{description}</p>
      </section>
    </div>
  );
};

export default GrantBox;
