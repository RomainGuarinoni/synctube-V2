import { Profil } from '@synctube-v2/types';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';

import Cookies from 'js-cookie';
import { REFRESH_TOKEN_LOCATION } from '../config/cookie';
import { PROFIL_LOCATION } from '../config/localStorage';
import { LoginErrors } from '../errors/LoginErrors';
import { setCookie } from '../utils/cookie';
import { OAuthClient } from '../auth/OAuthClient';

type AuthState = {
  profil: Profil | null;
  loading: boolean;
  accessToken: string;
};

type CreateContextValue = {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  isAuthenticated: () => boolean;
  isLoading: () => boolean;
  login: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  openOAuthPrompt: () => void;
};

const AuthContext = createContext<CreateContextValue>({
  authState: {
    profil: null,
    loading: true,
    accessToken: '',
  },
  setAuthState: () => {
    return;
  },
  isAuthenticated: () => false,
  isLoading: () => true,
  login: async (code: string) => {
    return;
  },
  logout: async () => {
    return;
  },
  openOAuthPrompt: () => {
    return;
  },
});

const { Provider } = AuthContext;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const oAuthClient = useMemo(() => {
    return new OAuthClient(
      process.env.NEXT_PUBLIC_CLIENT_ID as string,
      process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      process.env.NEXT_PUBLIC_REDIRECT_URL as string,
    );
  }, []);

  const [authState, setAuthState] = useState<AuthState>({
    profil: null,
    loading: true,
    accessToken: '',
  });

  const isAuthenticated = () => {
    return !authState.loading && !!authState.profil;
  };

  const isLoading = () => {
    return authState.loading;
  };

  const openOAuthPrompt = () => {
    oAuthClient.openOAuthPrompt();
  };

  const login = async (code: string) => {
    const tokens = await oAuthClient.getTokens(code);

    if (!tokens.scope) {
      throw new Error(LoginErrors.scopeMissing);
    }

    if (tokens.scope.split(' ').length !== oAuthClient.SCOPES.length) {
      throw new Error(LoginErrors.allScopeNotAccepeted);
    }

    if (!tokens.access_token || !tokens.id_token || !tokens.refresh_token) {
      throw new Error(LoginErrors.tokenMissing);
    }

    const profil = oAuthClient.getProfil(tokens.id_token);

    if (!profil) {
      throw new Error(LoginErrors.profilMissing);
    }

    try {
      await axios.post('/api/user/login', profil);
    } catch (err) {
      throw new Error(LoginErrors.apiError);
    }

    setCookie(REFRESH_TOKEN_LOCATION, tokens.refresh_token as string, {
      isSession: false,
    });

    console.log(profil);
    localStorage.setItem(PROFIL_LOCATION, JSON.stringify(profil));

    setAuthState({
      loading: false,
      profil: profil,
      accessToken: tokens.access_token,
    });
  };

  const logout = async () => {
    if (!isAuthenticated()) {
      throw new Error('the user is not authenticated');
    }

    setAuthState({ profil: null, loading: true, accessToken: '' });

    await oAuthClient.revokeToken(authState.accessToken);

    Cookies.remove(REFRESH_TOKEN_LOCATION);

    localStorage.removeItem(PROFIL_LOCATION);
  };

  useEffect(() => {
    async function verifyUserAuthentification() {
      try {
        const refreshToken = Cookies.get(REFRESH_TOKEN_LOCATION);

        if (!refreshToken) {
          throw new Error('No refresh token in the cookie');
        }

        const tokens = await oAuthClient.refreshTokens(refreshToken);

        if (!tokens) {
          throw new Error('Cannot get a new AccessToken');
        }

        const profil = localStorage.getItem(PROFIL_LOCATION);

        setAuthState({
          loading: false,
          profil: profil
            ? JSON.parse(profil)
            : oAuthClient.getProfil(tokens.id_token),
          accessToken: tokens.access_token,
        });
      } catch (err) {
        console.error('Error in authContext', (err as Error).message);
        setAuthState({ profil: null, loading: false, accessToken: '' });
      }
    }

    verifyUserAuthentification();
  }, [oAuthClient]);

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        isAuthenticated,
        isLoading,
        openOAuthPrompt,
        login,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
