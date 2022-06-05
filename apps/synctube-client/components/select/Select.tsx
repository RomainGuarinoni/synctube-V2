import { useState } from 'react';
import { useOnclickOutside } from '../../hooks/useOnClickOutside';
import { SelectItems, SelectItemsProps } from './SelectItems';

interface Selectprops {
  children: React.ReactNode;
  items: SelectItemsProps[];
  align: 'left' | 'right';
  bold?: boolean;
  large?: boolean;
  onClose?: () => void;
}

export function Select({
  children,
  items,
  bold,
  align,
  large,
  onClose,
}: Selectprops): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const profilRef = useOnclickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
    if (onClose) onClose();
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`text-zinc-400 flex flex-row items-center cursor-pointer relative  ${
        bold ? 'font-bold' : 'font-normal'
      }`}
      onClick={handleClick}
      ref={profilRef}
    >
      {children}

      {isOpen && (
        <div
          className={`absolute top-12 z-10 ${large ? `w-[10rem]` : ''} ${
            align === 'left' ? 'left-0' : 'right-0'
          } bg-zinc-800 border-[0.1px]   border-[#ffffff1a] rounded-md overflow-hidden `}
        >
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
