import React, { useState } from 'react';
import styles from '@/app/styles/Project.module.css';

const ProjectDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-8 flex flex-col gap-2">
      <p
        onClick={toggleExpand}
        className={`mb-2 cursor-pointer font-inter text-base font-normal leading-6 text-slate-600 ${
          !isExpanded ? styles.lineClamp : ''
        }`}
      >
        {description}
      </p>
      {!isExpanded && (
        <span
          onClick={toggleExpand}
          className="cursor-pointer text-dark-600 hover:underline"
        >
          View more
        </span>
      )}
      {isExpanded && (
        <span
          onClick={toggleExpand}
          className="cursor-pointer text-dark-600 hover:underline"
        >
          View less
        </span>
      )}
    </div>
  );
};

export default ProjectDescription;
