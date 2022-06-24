import React, { InputHTMLAttributes } from 'react';

interface Props {
  label: string;
}

export const TextArea: React.FC<
  Props & InputHTMLAttributes<HTMLTextAreaElement>
> = ({ label, ...props }) => {
  const id = `${label}-input`;

  return (
    <div className="text-zinc-200 w-full flex flex-col items-start justify-start gap-2">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className="w-full h-40 px-2 rounded-md outline-none bg-zinc-900 border-0 focus:border-2 border-emerald-500 transition-all ease-in duration-75"
        {...props}
      />
    </div>
  );
};
