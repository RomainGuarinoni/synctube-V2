import { useState } from 'react';
import { Video } from '@synctube-v2/types';
import { useSwrInfiniteResponse } from '../api/fetcher';
import { YoutubeResponse } from '../api/youtube';
import videos from './youtubeResponse.json';

export function useYoutubeSearchMock(
  searchInput: string,
): useSwrInfiniteResponse<YoutubeResponse> {
  const [data, setData] = useState<YoutubeResponse[]>([
    videos as unknown as YoutubeResponse,
  ]);

  const size = data.length;

  const setSize = (size: number) => {
    for (let i = 0; i < size; i++) {
      setData(data.concat(videos as unknown as YoutubeResponse));
    }
  };

  return {
    data,
    setSize,
    size,
    isError: false,
    isValidating: false,
  };
}
