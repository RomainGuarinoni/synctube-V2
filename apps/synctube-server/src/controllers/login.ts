import type { Request, Response } from 'express';

import { OAuth2Client } from 'google-auth-library';

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL,
);

export const login = async (req: Request, res: Response) => {
  const code = req.body.code as string | undefined;

  if (!code) {
    return res.status(400).json({ error: 'E_MISSING_CODE' });
  }

  try {
    const token = await oAuth2Client.getToken(code);

    console.log('SUCESSFUL DECODE');
    console.log(token);

    res.status(200).json({ token });
  } catch (e) {
    console.log('FAILED DECODE CODE');

    res.status(500).json({ error: 'E_GOOGLE_AUTH_ERROR', msg: e.message });
  }
};

export const redirectToGoogleAuthPrompt = async (_, res: Response) => {
  const scope = ['https://www.googleapis.com/auth/youtube.force-ssl'];

  const redirect_url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope,
  });

  return res.status(200).json({ redirect_url });
};
