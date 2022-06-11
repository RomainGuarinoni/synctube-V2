import { Video } from '@synctube-v2/types';
import axios from 'axios';
import useSWR from 'swr';
import { useSwrResponse, fetcher } from './fetcher';

export function useFavourite(roomId: string | null): useSwrResponse<Video[]> {
  const { data, error } = useSWR<Video[]>(
    roomId ? `/api/favourite` : null,
    fetcher,
  );

  return {
    data,
    isError: error,
  };
}

export async function addFavouriteVideo(
  userId: string,
  video: Video,
): Promise<void> {
  await axios.post('/api/favourite', { userId, video });
}
