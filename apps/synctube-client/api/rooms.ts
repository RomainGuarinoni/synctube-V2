import axios from 'axios';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Room, Profil, Paginate } from '@synctube-v2/types';
import { useAuth } from '../context/AuthContext';
import { fetcher, useSwrInfiniteResponse, useSwrResponse } from './fetcher';
import { routes } from './routes';
import { MAX_RESULT } from './config';

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

export function useGetRoom(roomId: string | undefined): useSwrResponse<Room> {
  const { data, error, isValidating } = useSWR<Room>(
    roomId ? routes.rooms.room(roomId) : null,
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
  await axios.delete(routes.rooms.room(roomId));
}

export async function modifyRoom(
  roomId: string,
  name: string,
  description?: string,
): Promise<void> {
  await axios.patch(routes.rooms.room(roomId), { name, description });
}

type GetKeyResponse = [
  url: string,
  params: {
    limit: number;
    pageToken?: string;
    searchInput?: string;
  },
];

function getKeyBuilder(profil: Profil | null, searchInput?: string) {
  return function getKey(
    pageIndex: number,
    previousPageData: Paginate<Room>,
  ): GetKeyResponse | null {
    if ((previousPageData && !previousPageData.items.length) || !profil) {
      return null;
    }

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return [
        routes.rooms.getUserRoomsVisited(profil.id),
        {
          limit: MAX_RESULT,
          ...(searchInput ? { searchInput } : {}),
        },
      ];
    }

    return [
      routes.videos.favourite,
      {
        limit: MAX_RESULT,
        pageToken: previousPageData.nextPageToken,
        ...(searchInput ? { searchInput } : {}),
      },
    ];
  };
}

export function useGetUserRoomsVisited(
  searchInput: string | undefined,
): useSwrInfiniteResponse<Paginate<Room>> {
  const {
    authState: { profil },
  } = useAuth();

  const getKey = getKeyBuilder(profil, searchInput);

  const { data, error, size, setSize, isValidating } = useSWRInfinite<
    Paginate<Room>,
    boolean
  >(getKey, fetcher);

  return {
    data,
    isError: error,
    size,
    setSize,
    isValidating,
  };
}
