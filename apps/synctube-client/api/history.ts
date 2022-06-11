import { Video } from '@synctube-v2/types';
import useSWR from 'swr';
import { useSwrResponse, fetcher } from './fetcher';

export function useHistory(roomId: string | null): useSwrResponse<Video[]> {
  const { data, error } = useSWR<Video[]>(
    roomId ? `/api/history` : null,
    fetcher,
  );

  return {
    data,
    isError: error,
  };
}
