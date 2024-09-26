import { FC } from 'react';
import Image from 'next/image';

const TextBlock: FC<{
  mainText: string;
  highlightText: string;
  description: string;
  highlightImage: {
    src: string;
    alt: string;
    styles: string;
    width: number;
    height: number;
    scale?: number;
  };
}> = ({ mainText, highlightText, description, highlightImage }) => (
  <p className="sm:w-[35%]] w-4/5 text-start text-3xl font-bold text-dark-500 xl:text-4xl">
    {mainText}{' '}
    <span className="relative inline-block">
      <Image
        src={highlightImage.src}
        alt={highlightImage.alt}
        className={highlightImage.styles}
        width={highlightImage.width}
        height={highlightImage.height}
        style={{
          transform: highlightImage.scale
            ? `scale(${highlightImage.scale})`
            : 'scale(1)',
        }}
      />
      <span className="text-primary">{highlightText}</span>
    </span>{' '}
    {description}
  </p>
);

export default TextBlock;
