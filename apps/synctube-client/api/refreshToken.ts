import { RefreshTokenResponse } from '@synctube-v2/types';

import { Axios } from './axios';

export async function refreshAccessToken(
  refreshToken: string,
): Promise<string> {
  const { data } = await Axios.post<RefreshTokenResponse>('/refreshtoken', {
    refreshToken,
  });

  return data.access_token;
}
