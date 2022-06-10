import { useState, useEffect, createRef, RefObject } from 'react';

export function useObserver<T extends HTMLElement>(
  callback: () => void,
): RefObject<T> {
  const ref = createRef<T>();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]['intersectionRatio'] !== 0) {
          callback();
        }
      },
      { root: document.documentElement },
    );

    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);

  return ref;
}
