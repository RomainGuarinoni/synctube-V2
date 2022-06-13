import useSWRInfinite from 'swr/infinite';
import { useAuth } from '../context/AuthContext';
import { fetcher, useSwrInfiniteResponse } from './fetcher';

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

type GetKeyResponse = [
  url: string,
  params: {
    part: string;
    q: string;
    maxResults: number;
    pageToken?: string;
  },
  accessToken: string,
];

const MAX_RESULT = 25;

const PART = 'snippet';

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getKeyBuilder(searchInput: string, accessToken: string) {
  return function getKey(
    pageIndex: number,
    previousPageData: YoutubeResponse,
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

  return {
    data,
    isError: error,
    size,
    setSize,
    isValidating,
  };
}
