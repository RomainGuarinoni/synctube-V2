import React, { useMemo } from 'react';
import { MAX_RESULT } from '../../api/config';
import { useFavouriteSearch } from '../../api/favourite';
import { convertApiVideo } from '../../utils/video';

import { ResultPage } from './resultPage/ResultPage';
import { SearchProps } from './searchProps';

export const FavouriteSearch: React.FC<SearchProps> = ({ searchInput }) => {
  const { data, isError, size, setSize, isValidating } =
    useFavouriteSearch(searchInput);

  const favouriteVideos = useMemo(() => convertApiVideo(data), [data]);

  const reachedEnd = useMemo(() => {
    if (!data) return false;

    return data[data.length - 1].items.length != MAX_RESULT;
  }, [data]);

  return (
    <ResultPage
      data={favouriteVideos}
      isError={isError}
      size={size}
      setSize={setSize}
      isValidating={isValidating}
      reachedEnd={reachedEnd}
    />
  );
};
