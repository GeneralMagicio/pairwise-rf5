import React, { FC } from "react";
import { useCollapse } from "react-collapsed";
import { ArrowDownIcon } from "@/public/assets/icon-components/ArrowDown";
import { ArrowUpIcon } from "@/public/assets/icon-components/ArrowUp";

interface Props {
  question: string;
  answer: string;
}

const QABox: FC<Props> = ({ answer, question }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-2 max-w-2xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 items-center font-semibold">
          {question}
        </div>
        <button
          {...getToggleProps()}
          className="text-gray-600 text-sm hover:underline"
        >
          {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
      </div>
      <section {...getCollapseProps()}>
        <p className="text-gray-600 mb-4">{answer}</p>
      </section>
    </div>
  );
};

export default QABox;
