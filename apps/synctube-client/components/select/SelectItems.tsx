import React from 'react';

export interface SelectItemsProps {
  label: string;
  callback: () => void;
}

export const SelectItems: React.FC<SelectItemsProps> = ({
  label,
  callback,
}) => {
  return (
    <p
      onClick={callback}
      className="ease-linear duration-100 hover:bg-zinc-700 w-full px-5 py-2 flex items-center justify-center"
    >
      {label}
    </p>
  );
};
