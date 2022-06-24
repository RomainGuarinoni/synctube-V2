import React from 'react';
import { useOnclickOutside } from '../../hooks/useOnClickOutside';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ children, onClose }) => {
  const ref = useOnclickOutside<HTMLDivElement>(onClose);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/40 p-14">
      <div className="absolute z-50" ref={ref}>
        {children}
      </div>
    </div>
  );
};
