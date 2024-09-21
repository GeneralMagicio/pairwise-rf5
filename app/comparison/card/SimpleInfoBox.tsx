import React, { FC } from 'react';
import { useCollapse } from 'react-collapsed';
import { WebsiteIcon } from '@/public/assets/icon-components/WebsiteIcon';
import { OPIcon } from '@/public/assets/icon-components/OP';
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown';
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp';

interface Props {
  title: string
  description: string
  type: 'contract' | 'link' | 'pricing'
}

const OP_EXPLORER_URL = 'https://optimistic.etherscan.io/';

const ICONS_MAP: Record<Props['type'], React.ReactNode> = {
  contract: <OPIcon />,
  link: <WebsiteIcon height={20} width={20} />,
  pricing: null,
};

const SimpleInfoBox: FC<Props> = ({ description, title, type }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const renderTitle = () => {
    if (type === 'pricing') return title;

    const isContract = type === 'contract';
    const href = isContract ? `${OP_EXPLORER_URL}/address/${title}` : title;
    const displayTitle = isContract ? title : title.split('https://')[1];

    return (
      <a
        href={href}
        target="_blank"
        className="break-all text-gray-700 hover:underline"
        rel="noopener noreferrer"
      >
        {displayTitle}
      </a>
    );
  };

  return (
    <div className="max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-5">{ICONS_MAP[type]}</span>
          {renderTitle()}
        </div>
        {description.length > 0 && (
          <button
            {...getToggleProps()}
            className="text-sm text-gray-600 hover:underline"
          >
            {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
        )}
      </div>
      <section {...getCollapseProps()}>
        <p className="mb-4 text-gray-600">{description}</p>
      </section>
    </div>
  );
};

export default SimpleInfoBox;
