import { Video, Paginate } from '@synctube-v2/types';
import axios from 'axios';
import useSWRInfinite from 'swr/infinite';
import { useSwrInfiniteResponse, fetcher } from './fetcher';

const MAX_RESULT = 25;

function getKeyBuilder(searchInput: string, accessToken: string) {
  return function getKey(
    pageIndex: number,
    previousPageData: Paginate<Video>,
  ): GetKeyResponse | null {
    if (
      (previousPageData && !previousPageData.nextPageToken) ||
      !searchInput.trim().length
    )
      return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0)
      return [
        YOUTUBE_URL,
        { part: PART, q: searchInput, maxResults: MAX_RESULT },
        accessToken,
      ];

    // add the nextPageToken to the API endpoint
    return [
      YOUTUBE_URL,
      {
        part: PART,
        q: searchInput,
        maxResults: MAX_RESULT,
        pageToken: previousPageData.nextPageToken,
      },
      accessToken,
    ];
  };
}

export function useYoutubeSearch(
  searchInput: string,
): useSwrInfiniteResponse<YoutubeResponse> {
  const {
    authState: { accessToken },
  } = useAuth();

  const getKey = getKeyBuilder(searchInput, accessToken);

  const { data, error, size, setSize, isValidating } = useSWRInfinite<
    YoutubeResponse,
    boolean
  >(getKey, fetcher, { errorRetryCount: 3 });
  console.log(data, error, size, isValidating);

  return {
    data,
    isError: error,
    size,
    setSize,
    isValidating,
  };
}

export async function addFavouriteVideo(
  userId: string,
  video: Video,
): Promise<void> {
  await axios.post('/api/favourite', { userId, video });
}
