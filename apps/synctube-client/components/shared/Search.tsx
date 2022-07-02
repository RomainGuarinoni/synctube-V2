import { FormEvent, InputHTMLAttributes, useState } from 'react';
import { ISearch } from '../icons/ISearch';

interface Props {
  handleSubmit: (searchInput: string) => void;
  defaultSearchInput?: string;
}

export const Search: React.FC<
  Props & InputHTMLAttributes<HTMLInputElement>
> = ({ handleSubmit, defaultSearchInput, ...props }) => {
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
        className="h-full flex-1 text-left bg-inherit px-2 rounded-lg focus:outline-none"
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
