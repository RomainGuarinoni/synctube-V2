import useSWRInfinite from 'swr/infinite';
import { useAuth } from '../context/AuthContext';
import { fetcher, useSwrInfiniteResponse } from './fetcher';

export type SearchResult = {
  kind: 'youtube#searchResult';
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
};

export type YoutubeResponse = {
  nextPageToken: string;
  prevPageToken: string;
  items: SearchResult[];
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
      (previousPageData && !previousPageData.items) ||
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

  const { data, error, size, setSize } = useSWRInfinite<YoutubeResponse>(
    getKey,
    fetcher,
  );

  return {
    data,
    isError: error,
    size,
    setSize,
  };
}
