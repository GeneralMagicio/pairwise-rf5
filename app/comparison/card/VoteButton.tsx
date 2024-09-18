import React, { FC } from "react";

interface Props {
  onClick: () => void;
}

const VoteButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center rounded-lg border bg-primary px-12 py-3 transition duration-150 ease-out hover:ease-in"
    >
      <span className="text-white">Select</span>
    </button>
  );
};

export default VoteButton;
