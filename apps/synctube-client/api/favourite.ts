import { Video, Paginate, Profil } from '@synctube-v2/types';
import axios from 'axios';
import useSWRInfinite from 'swr/infinite';
import { useAuth } from '../context/AuthContext';
import { MAX_RESULT } from './config';
import { useSwrInfiniteResponse, fetcher } from './fetcher';
import { routes } from './routes';

type GetKeyResponse = [
  url: string,
  params: {
    userId: string;
    limit: number;
    pageToken?: string;
    searchInput?: string;
  },
];

function getKeyBuilder(profil: Profil | null, searchInput?: string) {
  return function getKey(
    pageIndex: number,
    previousPageData: Paginate<Video>,
  ): GetKeyResponse | null {
    if ((previousPageData && !previousPageData.items.length) || !profil) {
      return null;
    }

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return [
        routes.videos.favourite,
        {
          userId: profil.id,
          limit: MAX_RESULT,
          ...(searchInput ? { searchInput } : {}),
        },
      ];
    }

    return [
      routes.videos.favourite,
      {
        userId: profil.id,
        limit: MAX_RESULT,
        pageToken: previousPageData.nextPageToken,
        ...(searchInput ? { searchInput } : {}),
      },
    ];
  };
}

export function useFavouriteSearch(
  searchInput: string | undefined,
): useSwrInfiniteResponse<Paginate<Video>> {
  const {
    authState: { profil },
  } = useAuth();

  const getKey = getKeyBuilder(profil, searchInput);

  const { data, error, size, setSize, isValidating } = useSWRInfinite<
    Paginate<Video>,
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

export async function addFavouriteVideo(
  userId: string,
  video: Video,
): Promise<void> {
  await axios.post('/api/favourite', { userId, video });
}
