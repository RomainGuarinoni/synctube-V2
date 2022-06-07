import { useRouter } from 'next/router';
import { Video } from '@synctube-v2/types';
import { useEffect, useState } from 'react';
import { useFavourite } from '../api/favourite';
import { useHistory } from '../api/history';
import { useYoutubeSearch, YoutubeResponse } from '../api/youtube';
import { Loader } from '../components/Loader';
import { SearchLocation } from '../components/navbar/SearchBar';
import { Tab } from '../components/Tabs';
import { authenticatedRoute } from '../guard/authenticatedRoute';
import mockYoutubeResponse from '../mock/youtubeResponse.json';
import { convertYoutubeVideo } from '../utils/video';
import { VideosList } from '../components/resultPage/VideosList';

function Search(): JSX.Element {
  const { query, push } = useRouter();

  const searchInput = query.q as string;
  const [searchLocation, setSearchLocation] = useState<SearchLocation | null>(
    null,
  );

  // const { data: youtubeData, isError: youtubeError } = useYoutubeSearch(
  //   searchLocation && searchLocation === SearchLocation.youtube && searchInput
  //     ? searchInput
  //     : '',
  // );

  const { data: youtubeData, isError: youtubeError } = {
    data: mockYoutubeResponse as unknown as YoutubeResponse,
    isError: false,
  };

  const { data: historyData, isError: historyError } = useHistory(
    searchLocation && searchLocation === SearchLocation.history ? '510' : null,
  );

  const { data: favouriteData, isError: favouriteError } = useFavourite(
    searchLocation && searchLocation === SearchLocation.favourite
      ? '510'
      : null,
  );

  const handleChangeSearchLocation = (location: SearchLocation) => {
    push({ pathname: '/search', query: { ...query, location } }, undefined, {
      shallow: true,
    });
    setSearchLocation(location);
  };

  const getDataAndErrorOfSelected = (): {
    data: Video[] | undefined;
    error: boolean;
  } => {
    switch (searchLocation) {
      case null:
        return { data: undefined, error: false };
      case SearchLocation.youtube:
        return { data: convertYoutubeVideo(youtubeData), error: youtubeError };
      case SearchLocation.favourite:
        return { data: favouriteData, error: favouriteError };
      case SearchLocation.history:
        return { data: historyData, error: historyError };
    }
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

  if (getDataAndErrorOfSelected().error) {
    return <div className="text-zinc-400 font-bold">Error</div>;
  }

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

      <div className="overflow-auto flex-1">
        {getDataAndErrorOfSelected().data ? (
          <VideosList video={getDataAndErrorOfSelected().data as Video[]} />
        ) : (
          <div className=" w-full h-full flex flex-col items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default authenticatedRoute(Search);
