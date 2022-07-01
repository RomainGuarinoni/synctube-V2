import axios from 'axios';
import useSWR from 'swr';
import { Room } from '@synctube-v2/types';
import { fetcher, useSwrResponse } from './fetcher';
import { routes } from './routes';

export function useGetUserRoomsOwner(
  userId: string | undefined,
): useSwrResponse<Room[]> {
  const { data, error, isValidating } = useSWR<Room[]>(
    userId ? routes.rooms.getUserRoomsOwner(userId) : null,
    fetcher,
  );

  return {
    data,
    isError: error,
    isValidating,
  };
}

export function useGetUserRoomsVisited(
  userId: string | undefined,
): useSwrResponse<Room[]> {
  const { data, error, isValidating } = useSWR<Room[]>(
    userId ? routes.rooms.getUserRoomsVisited(userId) : null,
    fetcher,
  );

  return {
    data,
    isError: error,
    isValidating,
  };
}

export async function createRoom(
  name: string,
  description: string,
  userId: string,
): Promise<void> {
  await axios.post(routes.rooms.createRoom, { name, description, userId });
}

export async function deleteRoom(roomId: string): Promise<void> {
  await axios.delete(routes.rooms.deleteRoom(roomId));
}
