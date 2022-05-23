export interface LoginResponse {
  access_token: string;
  scope: string;
  token_type: string;
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export interface RedirectToGooglAuthPromptResponse {
  redirect_url: string;
}
