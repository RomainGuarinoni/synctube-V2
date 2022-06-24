import { Video } from '@synctube-v2/types';
import useSWR from 'swr';
import { useSwrResponse, fetcher } from './fetcher';
import { routes } from './routes';

export function useHistory(roomId: string | null): useSwrResponse<Video[]> {
  const { data, error, isValidating } = useSWR<Video[]>(
    roomId ? routes.videos.history : null,
    fetcher,
  );

  return {
    data,
    isError: error,
    isValidating,
  };
}
