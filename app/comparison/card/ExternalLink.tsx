import { MirrorIcon } from "@/public/assets/icon-components/MirrorIcon";
import { WarpcastIcon } from "@/public/assets/icon-components/WarpcaseIcon";
import { WebsiteIcon } from "@/public/assets/icon-components/WebsiteIcon";
import { XIcon } from "@/public/assets/icon-components/XIcon";
import { FC } from "react";

interface Props {
  type: "website" | "warpcast" | "x" | "mirror";
  address: string;
}

const getIcon = (type: Props["type"]) => {
  switch (type) {
    case "mirror":
      return <MirrorIcon />;
    case "warpcast":
      return <WarpcastIcon />;
    case "website":
      return <WebsiteIcon />;
    case "x":
      return <XIcon />;
    default:
      return <WebsiteIcon />;
  }
};

export const ExternalLink: FC<Props> = ({ address, type }) => {
  return (
    <div className="flex gap-1 items-center">
      {getIcon(type)}
      <a target="_blank" rel="noopener noreferrer" href={address}>
        {address.split("https://")[1]}
      </a>
    </div>
  );
};
