import { useState } from 'react';
import { useOnclickOutside } from '../hooks/useOnClickOutside';
import { SelectItems, SelectItemsProps } from './SelectItems';

interface Selectprops {
  children: React.ReactNode;
  items: SelectItemsProps[];
}

export function Select({ children, items }: Selectprops): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const profilRef = useOnclickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="text-zinc-400 flex flex-row items-center cursor-pointer relative"
      onClick={handleClick}
      ref={profilRef}
    >
      {children}
      {isOpen && (
        <div className="absolute top-12 right-0 w-40 bg-zinc-800 border-[0.1px]  border-[#ffffff1a] rounded-md overflow-hidden">
          {items.map(({ callback, label }, index) => (
            <SelectItems
              key={`indexitem-${index}`}
              callback={callback}
              label={label}
            />
          ))}
        </div>
      )}
    </div>
  );
}
