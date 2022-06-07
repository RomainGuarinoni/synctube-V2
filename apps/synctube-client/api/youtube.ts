import useSwr from 'swr';
import { useAuth } from '../context/AuthContext';
import { fetcher, useSwrResponse } from './fetcher';

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

export function useYoutubeSearch(
  searchInput: string,
  pageToken?: string,
): useSwrResponse<YoutubeResponse> {
  const {
    authState: { accessToken },
  } = useAuth();

  const { data, error } = useSwr<YoutubeResponse>(
    searchInput.trim().length
      ? [
          'https://www.googleapis.com/youtube/v3/search',
          {
            part: 'snippet',
            q: searchInput,
            maxResults: 25,

            ...(pageToken ? { pageToken } : {}),
          },
          accessToken,
        ]
      : null,
    fetcher,
  );

  return {
    data,
    isError: error,
  };
}
