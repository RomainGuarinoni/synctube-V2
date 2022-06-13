import { useState, useEffect } from 'react';
import { useFavouriteSearch } from '../../api/favourite';
import { convertApiVideo } from '../../utils/video';

import { ResultPage } from './resultPage/ResultPage';
import { SearchProps } from './searchProps';

export function FavouriteSearch({ searchInput }: SearchProps): JSX.Element {
  const { data, isError, size, setSize, isValidating } =
    useFavouriteSearch(searchInput);

  const [favouriteVideos, setFavouriteVideos] = useState(convertApiVideo(data));

  useEffect(() => {
    setFavouriteVideos(convertApiVideo(data));
  }, [data]);

  return (
    <ResultPage
      data={favouriteVideos}
      isError={isError}
      size={size}
      setSize={setSize}
      isValidating={isValidating}
    />
  );
}
