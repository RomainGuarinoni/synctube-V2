import {
  LoginResponse,
  RedirectToGooglAuthPromptResponse,
} from '@synctube-v2/types';

import { Axios } from './axios';

export async function LoginWithGoogle(): Promise<string> {
  const { data } = await Axios.get<RedirectToGooglAuthPromptResponse>('/login');

  return data.redirect_url;
}

export async function GetAuthTokens(code: string): Promise<LoginResponse> {
  const { data } = await Axios.post<LoginResponse>('/login', {
    code,
  });

  return data;
}
