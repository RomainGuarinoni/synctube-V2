import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SearchLocation } from '../components/navbar/SearchBar';
import { YoutubeSearch } from '../components/search/YoutubeSearch';
import { FavouriteSearch } from '../components/search/FavouriteSearch';
import { Tab } from '../components/shared/Tabs';
import { authenticatedRoute } from '../guard/authenticatedRoute';
import { HistorySearch } from '../components/search/HistorySearch';

function Search(): JSX.Element {
  const { query, push } = useRouter();

  const searchInput = query.q as string;
  const [searchLocation, setSearchLocation] = useState<SearchLocation | null>(
    null,
  );

  const handleChangeSearchLocation = (location: SearchLocation) => {
    push({ pathname: '/search', query: { ...query, location } }, undefined, {
      shallow: true,
    });
    setSearchLocation(location);
  };

  // Redirect to index page if there is no query q in the path
  // TODO update the redirection
  useEffect(() => {
    if (!searchInput) {
      push('/');
    }
  }, [push, searchInput]);

  // Set the searchLocation based on the query location
  // If the location is invalid, default location is SearchLocation.youtube
  useEffect(() => {
    switch (query.location) {
      case SearchLocation.favourite:
        setSearchLocation(SearchLocation.favourite);
        break;
      case SearchLocation.history:
        setSearchLocation(SearchLocation.history);
        break;
      case SearchLocation.youtube:
      default:
        setSearchLocation(SearchLocation.youtube);
    }
  }, [setSearchLocation, query]);

  return (
    <div className="flex flex-col justify-start items-center flex-wrap text-zinc-400 w-full h-full  ">
      <Tab
        items={[
          SearchLocation.youtube,
          SearchLocation.history,
          SearchLocation.favourite,
        ]}
        onChange={handleChangeSearchLocation}
        defaultValue={searchLocation || SearchLocation.youtube}
      />
      {searchLocation === SearchLocation.youtube && (
        <YoutubeSearch searchInput={searchInput} />
      )}
      {searchLocation === SearchLocation.favourite && (
        <FavouriteSearch searchInput={searchInput} />
      )}
      {searchLocation === SearchLocation.history && (
        <HistorySearch searchInput={searchInput} />
      )}
    </div>
  );
}

export default authenticatedRoute(Search);
