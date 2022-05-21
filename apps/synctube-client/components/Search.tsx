import { FormEvent, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

import { ISearch } from './icons/ISearch';

export function Search(): JSX.Element {
  const { search: searchText } = useTranslation();

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // TODO do smthing with data
    console.log(searchInput);
  };

  return (
    <form
      className={`h-12 lg:w-[30em] w-10/12 bg-zinc-900 text-zinc-700 font-bold flex items-center justify-between rounded-lg`}
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder={searchText}
        title={searchText}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="h-full flex-1 text-left bg-inherit px-2 rounded-lg text-zinc-400 focus:outline-none"
      />
      <div className="relative bg-zinc-600 w-10 h-full flex items-center justify-center rounded-r-lg text-zinc-400">
        <button className="cursor-pointer absolute">
          <ISearch />
        </button>
      </div>
    </form>
  );
}
