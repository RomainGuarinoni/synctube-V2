import { useEffect, useRef } from 'react';

export function useOnclickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current == null) {
        return;
      }

      if (ref.current.contains(e.target as Node)) {
        return;
      }

      callback();
    }

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [callback]);

  return ref;
}
