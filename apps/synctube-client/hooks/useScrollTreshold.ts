import { createRef, RefObject, useEffect } from 'react';

export const useScrollTreshold = <T extends HTMLElement>(
  treshold: number,
  callback: () => void,
): RefObject<T> => {
  if (treshold < 0 || treshold > 100) {
    throw new Error('The treshold value must be between 0 and 100');
  }

  const ref = createRef<T>();

  useEffect(() => {
    const refCurrent = ref.current;

    if (!refCurrent) {
      return;
    }

    function handleScroll(e: Event) {
      const scrollPercentage =
        (100 * (e.currentTarget as T).scrollTop) /
        ((e.currentTarget as T).scrollHeight -
          (e.currentTarget as T).clientHeight);

      if (scrollPercentage > treshold) {
        callback();
      }
    }

    refCurrent.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: true,
    });
    return () => {
      refCurrent.removeEventListener('scroll', handleScroll, {
        capture: true,
      });
    };
  }, [treshold, callback, ref]);

  return ref;
};
