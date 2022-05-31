import useSwr from 'swr';
import { useAuth } from '../context/AuthContext';
import { useFetcher, useSwrResponse } from './fetcher';

type SearchResult = {
  kind: 'youtube#searchResult';
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
};

type YoutubeResponse = {
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
    [
      'https://www.googleapis.com/youtube/v3/search',
      {
        part: 'snippet',
        q: searchInput,
        ...(pageToken ? { pageToken } : {}),
      },
      accessToken,
    ],
    useFetcher,
  );

  return {
    data: data,
    isError: error,
  };
}
