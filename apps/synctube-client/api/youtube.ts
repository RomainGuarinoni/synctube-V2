import useSWRInfinite from 'swr/infinite';
import { useAuth } from '../context/AuthContext';
import { MAX_RESULT } from './config';
import { fetcher, useSwrInfiniteResponse } from './fetcher';
import { routes } from './routes';

export type SearchResult = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string;
    publishTime: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
        width?: number;
        height?: number;
      };
      [key: string]: {
        url: string;
        width?: number;
        height?: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
};

export type YoutubeResponse = {
  items: SearchResult[];
  nextPageToken?: string;
  prevPageToken?: string;
  kind: string;
  etag: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

const PART = 'snippet';

export type GetYoutubeKeyResponse = [
  url: string,
  params: {
    part: string;
    q: string;
    maxResults: number;
    pageToken?: string;
  },
  accessToken: string,
];

function getKeyBuilder(searchInput: string, accessToken: string) {
  return function getKey(
    pageIndex: number,
    previousPageData: YoutubeResponse,
  ): GetYoutubeKeyResponse | null {
    if (
      (previousPageData && !previousPageData.nextPageToken) ||
      !searchInput.trim().length
    )
      return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0)
      return [
        routes.videos.youtube,
        { part: PART, q: searchInput, maxResults: MAX_RESULT },
        accessToken,
      ];

    // add the nextPageToken to the API endpoint
    return [
      routes.videos.youtube,
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

  return {
    data,
    isError: error,
    size,
    setSize,
    isValidating,
  };
}
