import { useEffect, useState } from 'react';

interface TabProps<T> {
  items: T[];
  onChange: (item: T) => void;
  defaultValue?: T;
}

export function Tab<T extends string | number>({
  items,
  onChange,
  defaultValue,
}: TabProps<T>): JSX.Element {
  const [selected, setSelected] = useState(defaultValue || items[0]);

  const handleChange = (item: T) => {
    setSelected(item);
    onChange(item);
  };

  useEffect(() => {
    if (defaultValue) setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <div className="w-full mb-5">
      <div
        className={`flex items-center relative justify-start font-bold items `}
      >
        {items.map((item) => (
          <p
            key={item}
            className={`cursor-pointer relative py-2 w-24 text-center ease-linear duration-100 ${
              selected === item ? 'text-zinc-100' : 'hover:text-zinc-300'
            }`}
            onClick={() => {
              handleChange(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
      <style jsx>{`
        .items::after {
          content: '';
          background-color: rgb(239 68 68);
          height: 3px;
          top: 2.5rem;
          width: 6rem;
          position: absolute;
          left: 0;
          transform: translateX(${6 * items.indexOf(selected)}rem);
          transition: ease 300ms;
        }
      `}</style>
    </div>
  );
}
