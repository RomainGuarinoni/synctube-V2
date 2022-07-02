import { useState } from 'react';
import { useSwrInfiniteResponse } from '../api/fetcher';
import { YoutubeResponse } from '../api/youtube';
import { youtubeResponseData } from './youtubeResponseData';

export function useYoutubeSearchMock(
  searchInput: string,
): useSwrInfiniteResponse<YoutubeResponse> {
  const [data, setData] = useState<YoutubeResponse[]>([youtubeResponseData]);

  const [isValidating, setIsValidating] = useState(false);

  const size = data.length;

  const setSize = async (size: number) => {
    setIsValidating(true);
    await sleep(1);

    const newItems = data[0].items.map((item) => {
      const id = idGenerator();
      item.id.videoId = id;
      return item;
    });

    setData(data.concat({ ...youtubeResponseData, items: newItems }));

    setIsValidating(false);
  };

  return {
    data,
    setSize,
    size,
    isError: false,
    isValidating: isValidating,
  };
}

function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

function idGenerator() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return S4() + S4() + S4() + S4() + S4();
}
