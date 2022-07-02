import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from '../../hooks/useTranslation';
import { IChevron } from '../icons/IChevron';
import { Search } from '../shared/Search';
import { Select } from '../select/Select';

export enum SearchLocation {
  youtube = 'youtube',
  history = 'history',
  favourite = 'favourite',
}

export const VideoSearch: React.FC = () => {
  const {
    searchLocation: { history, youtube, favourite },
    toast: { emptySearch },
  } = useTranslation();

  const { push, query } = useRouter();

  const [searchLocation, setSearchLocation] = useState<SearchLocation>(
    SearchLocation.youtube,
  );
  const [isSearchLocationOpen, SetIsSearchLocationOpen] = useState(false);
  const [defaultSearchInput, setDefaultSearchInput] = useState('');

  const handleSearch = (searchInput: string) => {
    if (!searchInput.trim().length) {
      toast.warn(emptySearch);
      return;
    }

    push({
      pathname: '/search',
      query: {
        q: searchInput.trim(),
        location: searchLocation,
      },
    });
  };

  useEffect(() => {
    if (query.q) {
      setDefaultSearchInput(query.q as string);
    }

    if (query.location) {
      setSearchLocation(query.location as SearchLocation);
    }
  }, [query]);

  return (
    <div
      className={`h-12  bg-zinc-900 text-zinc-700 font-bold flex items-center justify-start rounded-lg`}
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
      <div className="lg:w-[25em] w-10/12 h-full">
        <Search
          handleSubmit={handleSearch}
          defaultSearchInput={defaultSearchInput}
        />
      </div>
    </div>
  );
};
