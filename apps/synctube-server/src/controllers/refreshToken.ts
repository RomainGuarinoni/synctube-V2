import { RefreshTokenResponse } from '@synctube-v2/types';
import type { Request, Response } from 'express';
import { oAuth2Client } from '../auth/OAuthClient';

export async function refreshAcessToken(req: Request, res: Response) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ error: 'E_MISSING_REFRESH_TOKEN' });
  }

  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  try {
    const { token: newAccessToken } = await oAuth2Client.getAccessToken();

    const response: RefreshTokenResponse = {
      access_token: newAccessToken,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: 'E_CANNOT_REFRESH_TOKEN' });
  }
}
