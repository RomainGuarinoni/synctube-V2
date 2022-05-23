import {
  LoginResponse,
  RedirectToGooglAuthPromptResponse,
} from '@synctube-v2/types';

import type { Request, Response } from 'express';
import { oAuth2Client } from '../auth/OAuthClient';

export const login = async (req: Request, res: Response) => {
  const code = req.body.code as string | undefined;

  if (!code) {
    return res.status(400).json({ error: 'E_MISSING_CODE' });
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);

    oAuth2Client.setCredentials(tokens);

    const response: LoginResponse = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      scope: tokens.scope,
      token_type: tokens.token_type,
    };

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: 'E_GOOGLE_AUTH_ERROR', msg: e.message });
  }
};

export const redirectToGoogleAuthPrompt = async (_, res: Response) => {
  const scope = ['https://www.googleapis.com/auth/youtube.force-ssl'];

  const redirect_url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope,
  });

  const response: RedirectToGooglAuthPromptResponse = {
    redirect_url,
  };

  return res.status(200).json(response);
};
