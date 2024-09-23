import React, { useRef, useState } from 'react';
import { useDidUpdateEffect } from '@/app/utils/methods';

interface Props {
  children: React.ReactNode;
  handleLogic: (visibleIds: string[]) => void
  trigger: number
}

const ViewportLogger: React.FC<Props> = ({ children, handleLogic, trigger }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [_visibleIds, setVisibleIds] = useState<string[]>([]);

  useDidUpdateEffect(() => {
    // eslint-disable-next-line no-undef
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 25% of the element is visible
    };

    // eslint-disable-next-line no-undef
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const newVisibleIds: string[] = [];

      console.log('running');

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          newVisibleIds.push(entry.target.id);
        }
      });

      setVisibleIds(() => {
        const updatedIds = Array.from(new Set([...newVisibleIds]));
        handleLogic(updatedIds);
        return updatedIds;
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (containerRef.current) {
      const childElements = containerRef.current.querySelectorAll('[id]');
      childElements.forEach((element) => observer.observe(element));
      setTimeout(() => {
        childElements.forEach((element) => observer.unobserve(element));
      }, 20);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleLogic, trigger]);

  return <div className='scroll-smooth' ref={containerRef}>{children}</div>;
};

export default ViewportLogger;