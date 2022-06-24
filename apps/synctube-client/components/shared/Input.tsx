import React, { InputHTMLAttributes } from 'react';

interface Props {
  label: string;
}

export const Input: React.FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  ...props
}) => {
  const id = `${label}-input`;

  return (
    <div className="text-zinc-200 w-full flex flex-col items-start justify-start gap-2 ">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="w-full h-12 px-2 rounded-md outline-none bg-zinc-900 border-0 focus:border-2 border-emerald-500 transition-all ease-in duration-75"
        {...props}
      />
    </div>
  );
};
