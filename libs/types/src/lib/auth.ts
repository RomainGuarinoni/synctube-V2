export interface LoginResponse {
  access_token: string;
  scope: string;
  token_type: string;
  refresh_token: string;
  profil: Profil;
}

export interface RefreshTokenResponse {
  access_token: string;
  profil: Profil;
}

export interface RedirectToGooglAuthPromptResponse {
  redirect_url: string;
}

export interface Profil {
  id: string;
  givenName: string;
  familyName: string;
  picture: string;
}
