import {
  LoginResponse,
  RedirectToGooglAuthPromptResponse,
} from '@synctube-v2/types';

import type { Request, Response } from 'express';
import { oAuth2Client } from '../auth/OAuthClient';

const SCOPE = [
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/userinfo.profile',
];

export const login = async (req: Request, res: Response) => {
  const code = req.body.code as string | undefined;

  if (!code) {
    return res.status(400).json({ error: 'E_MISSING_CODE' });
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);

    if (tokens.scope.split(' ').length !== SCOPE.length) {
      return res.status(400).json({ error: 'E_ALL_SCOPE_NOT_ACCEPTED' });
    }

    const loginTicket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
    });

    const profil = loginTicket.getPayload();

    const response: LoginResponse = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      scope: tokens.scope,
      token_type: tokens.token_type,
      profil: {
        id: profil.sub,
        familyName: profil.family_name,
        givenName: profil.given_name,
        email: profil.email,
      },
    };

    return res.status(200).json(response);
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'E_GOOGLE_AUTH_ERROR', msg: e.message });
  }
};

export const redirectToGoogleAuthPrompt = async (_, res: Response) => {
  const redirect_url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPE,
  });

  const response: RedirectToGooglAuthPromptResponse = {
    redirect_url,
  };

  return res.status(200).json(response);
};
