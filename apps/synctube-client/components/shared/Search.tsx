import { FormEvent, InputHTMLAttributes, useState } from 'react';
import { ISearch } from '../icons/ISearch';

interface Props {
  handleSubmit: (searchInput: string) => void;
  defaultSearchInput?: string;
  withBorder?: boolean;
}

export const Search: React.FC<
  Props & Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'>
> = ({ handleSubmit, defaultSearchInput, withBorder, ...props }) => {
  const [searchInput, setSearchInput] = useState<string>(
    defaultSearchInput || '',
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(searchInput);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`h-full w-full bg-zinc-900 text-zinc-400 font-bold flex items-center justify-start rounded-lg`}
    >
      <input
        className={`h-full flex-1 text-left bg-inherit px-2 rounded-l-lg focus:outline-none ${
          withBorder && 'border-2 border-zinc-600'
        }`}
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        {...props}
      />
      <button className="cursor-pointer bg-zinc-600 w-10 h-full flex items-center justify-center rounded-r-lg">
        <ISearch />
      </button>
    </form>
  );
};
