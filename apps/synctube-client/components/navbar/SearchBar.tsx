import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { IChevron } from '../icons/IChevron';

import { ISearch } from '../icons/ISearch';
import { Select } from '../select/Select';

export enum SearchLocation {
  youtube = 'youtube',
  history = 'history',
  favourite = 'favourite',
}

export function SearchBar(): JSX.Element {
  const {
    search: searchText,
    searchLocation: { history, youtube, favourite },
  } = useTranslation();

  const router = useRouter();

  const [searchLocation, setSearchLocation] = useState<SearchLocation>(
    SearchLocation.youtube,
  );
  const [isSearchLocationOpen, SetIsSearchLocationOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim().length) {
      console.error('cannot search youtube input');
      // TODO show error to the end user
    }

    router.push({
      pathname: '/search',
      query: {
        q: searchInput,
        location: searchLocation,
      },
    });
  };

  return (
    <form
      className={`h-12  bg-zinc-900 text-zinc-700 font-bold flex items-center justify-start rounded-lg`}
      onSubmit={handleSearch}
    >
      <Select
        items={[
          {
            label: youtube,
            callback: () => {
              setSearchLocation(SearchLocation.youtube);
              SetIsSearchLocationOpen(false);
            },
          },
          {
            label: history,
            callback: () => {
              setSearchLocation(SearchLocation.history);
              SetIsSearchLocationOpen(false);
            },
          },
          {
            label: favourite,
            callback: () => {
              setSearchLocation(SearchLocation.favourite);
              SetIsSearchLocationOpen(false);
            },
          },
        ]}
        align="left"
        onClose={() => {
          SetIsSearchLocationOpen(false);
        }}
      >
        <div
          className="flex items-center pl-2 text-zinc-400"
          onClick={() => {
            SetIsSearchLocationOpen(!isSearchLocationOpen);
          }}
        >
          <span>
            {searchLocation === SearchLocation.youtube
              ? youtube
              : searchLocation === SearchLocation.favourite
              ? favourite
              : history}
          </span>
          <div
            className={`w-3 mx-2 ${
              isSearchLocationOpen ? 'rotate-180' : 'rotate-0'
            } ease-in duration-100`}
          >
            <IChevron />
          </div>
        </div>
      </Select>
      <input
        type="text"
        placeholder={searchText}
        title={searchText}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="h-full lg:w-[25em] w-10/12 flex-1 text-left bg-inherit px-2 rounded-lg text-zinc-400 focus:outline-none"
      />
      <button className="cursor-pointer bg-zinc-600 w-10 h-full flex items-center justify-center rounded-r-lg text-zinc-400">
        <ISearch />
      </button>
    </form>
  );
}
