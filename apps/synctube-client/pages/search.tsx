import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SearchLocation } from '../components/navbar/VideoSearch';
import { YoutubeSearch } from '../components/search/YoutubeSearch';
import { FavouriteSearch } from '../components/search/FavouriteSearch';
import { Tab } from '../components/shared/Tabs';
import { authenticatedRoute } from '../guard/authenticatedRoute';
import { HistorySearch } from '../components/search/HistorySearch';
import { roomRoute } from '../guard/roomRoute';
import { Button } from '../components/shared/Button';
import { useRoom } from '../context/RoomContext';
import { useAuth } from '../context/AuthContext';

const Search: React.FC = () => {
  const { query, push } = useRouter();

  const { isAuthenticated } = useAuth();

  const searchInput = query.q as string;
  const [searchLocation, setSearchLocation] = useState<SearchLocation | null>(
    null,
  );

  const { getCurrentRoom } = useRoom();

  const handleChangeSearchLocation = (location: SearchLocation) => {
    push({ pathname: '/search', query: { ...query, location } }, undefined, {
      shallow: true,
    });
    setSearchLocation(location);
  };

  const handleReturnToRoomClick = () => {
    // Here we are sure that the room exist thanks to the
    // "roomRoute" HOC guard that wrap the search page
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion*/
    const { _id } = getCurrentRoom()!;

    push(`room/${_id}`);
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

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="flex flex-col justify-start items-center flex-wrap text-zinc-400 w-full h-full">
      <div className="w-full flex flex-wrap items-center">
        <div className="flex-1 flex justify-start ">
          <Tab
            items={[
              SearchLocation.youtube,
              SearchLocation.history,
              SearchLocation.favourite,
            ]}
            onChange={handleChangeSearchLocation}
            defaultValue={searchLocation || SearchLocation.youtube}
          />
        </div>
        <Button size="medium" onClick={handleReturnToRoomClick}>
          Retour
        </Button>
      </div>
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
};

export default authenticatedRoute(roomRoute(Search));
