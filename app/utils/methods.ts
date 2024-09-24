import { useRef, useEffect, EffectCallback, DependencyList } from 'react';

export const truncate = (text: string, maxChar: number) => {
  if (text.length < maxChar) return text;

  const slice = text.slice(0, maxChar);

  return `${slice}...`;
};

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export function useDidUpdateEffect(fn: EffectCallback, inputs: DependencyList) {
  const isMountingRef = useRef(false);

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (!isMountingRef.current) {
      return fn();
    } else {
      isMountingRef.current = false;
    }
  }, inputs);
}

export function getBiggerNumber(a: number | undefined, b: number | undefined) {
  if (a === undefined && b === undefined) {
    return 0;
  }
  if (a === undefined) {
    return b as number;
  }
  if (b === undefined) {
    return a as number;
  }
  return a > b ? a : b;
}
