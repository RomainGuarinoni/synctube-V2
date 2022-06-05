import axios from 'axios';

export type useSwrResponse<T> = {
  isError: boolean;
  data: T | undefined;
};

export async function fetcher(
  url: string,
  params?: Record<string, unknown>,
  accessToken?: string,
) {
  return await axios
    .get(url, {
      ...(params ? { params } : {}),
      ...(accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {}),
    })
    .then((res) => res.data)
    .catch(console.error);
}
