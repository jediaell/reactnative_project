import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): any => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
