import { Axios } from './axios';

interface Credential {
  access_token: string;
  scope: string;
  token_type: string;
  refresh_token: string;
}

export async function LoginWithGoogle(): Promise<string> {
  const res = await Axios.get('/login');

  return res.data.redirect_url;
}

export async function GetAuthTokens(code: string): Promise<Credential> {
  const response = await Axios.post('/login', {
    code,
  });

  return response.data.token.tokens;
}
