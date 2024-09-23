import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  handleLogic: (visibleIds: string[]) => void
}

const ViewportLogger: React.FC<Props> = ({ children, handleLogic }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 1, // Trigger when 25% of the element is visible
    };

    // eslint-disable-next-line no-undef
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const newVisibleIds: string[] = [];

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          newVisibleIds.push(entry.target.id);
        }
      });

      setVisibleIds((prevIds) => {
        const updatedIds = Array.from(new Set([...newVisibleIds]));
        handleLogic(updatedIds);
        return updatedIds;
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (containerRef.current) {
      const childElements = containerRef.current.querySelectorAll('[id]');
      childElements.forEach((element) => observer.observe(element));
    }

    return () => {
      observer.disconnect();
    };
  }, [handleLogic]);

  return <div className='scroll-smooth' ref={containerRef}>{children}</div>;
};

export default ViewportLogger;