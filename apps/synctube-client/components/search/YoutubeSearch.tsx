import React, { useMemo } from 'react';

import { useYoutubeSearch } from '../../api/youtube';
import { convertYoutubeVideo } from '../../utils/video';
import { MAX_RESULT } from '../../api/config';
import { SearchProps } from './searchProps';
import { ResultPage } from './resultPage/ResultPage';

export const YoutubeSearch: React.FC<SearchProps> = ({ searchInput }) => {
  const { data, isError, size, setSize, isValidating } =
    useYoutubeSearch(searchInput);

  // const { data, isError, size, setSize, isValidating } =
  //   useYoutubeSearchMock(searchInput);

  const youtubeVideos = useMemo(() => convertYoutubeVideo(data), [data]);

  const reachedEnd = useMemo(() => {
    if (!data) return false;

    return data[data.length - 1].items.length != MAX_RESULT;
  }, [data]);

  return (
    <ResultPage
      data={youtubeVideos}
      isError={isError}
      size={size}
      setSize={setSize}
      isValidating={isValidating}
      reachedEnd={reachedEnd}
    />
  );
};
