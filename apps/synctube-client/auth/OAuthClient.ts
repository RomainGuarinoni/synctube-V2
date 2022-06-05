import axios from 'axios';
import { stringify } from 'query-string';
import jwtDecode from 'jwt-decode';
import { Profil } from '@synctube-v2/types';

import { OAuthClientErrors } from '../errors/OAuthClientErrors';

type Tokens = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
  refresh_token?: string;
};

type IdTokenDecode = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
};

export class OAuthClient {
  readonly SCOPES = [
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  private readonly GOOGLE__OAUTH_URL =
    'https://www.googleapis.com/oauth2/v4/token';

  private readonly GOOGLE_REVOKE_URL =
    'https://accounts.google.com/o/oauth2/revoke';

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly redirectUrl: string,
  ) {
    return;
  }

  openOAuthPrompt(): void {
    if (!window) {
      throw new Error(OAuthClientErrors.windowUndefined);
    }
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: this.redirectUrl,
      client_id: this.clientId,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: this.SCOPES.join(' '),
    };

    window.location.href = `${rootUrl}?${stringify(options)}`;
  }

  async getTokens(code: string): Promise<Tokens> {
    try {
      const { data } = await axios.post<Tokens>(this.GOOGLE__OAUTH_URL, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.redirectUrl,
          grant_type: 'authorization_code',
        },
      });

      return data;
    } catch (err) {
      throw new Error('Cannot fetch the token google api');
    }
  }

  async refreshTokens(refresh_token: string): Promise<Tokens> {
    const { data } = await axios.post<Tokens>(this.GOOGLE__OAUTH_URL, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        refresh_token,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'refresh_token',
      },
    });

    return data;
  }

  getProfil(idToken: string): Profil {
    const { sub, given_name, family_name, picture } =
      jwtDecode<IdTokenDecode>(idToken);

    return { id: sub, givenName: given_name, familyName: family_name, picture };
  }

  async revokeToken(token: string): Promise<void> {
    await axios.post(this.GOOGLE_REVOKE_URL, null, { params: { token } });
  }
}
