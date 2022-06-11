import { useEffect, useState } from 'react';

import { useYoutubeSearch } from '../../api/youtube';
import { convertYoutubeVideo } from '../../utils/video';
import { useYoutubeSearchMock } from '../../mock/youtube';

import { SearchProps } from './searchProps';
import { ResultPage } from './resultPage/ResultPage';

export function YoutubeSearch({ searchInput }: SearchProps): JSX.Element {
  // const { data, isError, size, setSize, isValidating } =
  //   useYoutubeSearch(searchInput);

  const { data, isError, size, setSize, isValidating } =
    useYoutubeSearchMock(searchInput);

  const [youtubeVideos, setYOutubeVideos] = useState(convertYoutubeVideo(data));

  useEffect(() => {
    setYOutubeVideos(convertYoutubeVideo(data));
  }, [data]);

  return (
    <ResultPage
      data={youtubeVideos}
      isError={isError}
      size={size}
      setSize={setSize}
      isValidating={isValidating}
    />
  );
}
