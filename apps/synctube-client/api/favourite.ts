import { Video } from '@synctube-v2/types';
import useSWR from 'swr';
import { apiUrl } from '../config/api';
import { useSwrResponse, fetcher } from './fetcher';

export function useFavourite(roomId: string | null): useSwrResponse<Video[]> {
  const { data, error } = useSWR<Video[]>(
    roomId ? `${apiUrl}/favourite` : null,
    fetcher,
  );

  return {
    data,
    isError: error,
  };
}
