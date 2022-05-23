import { Profil } from '@synctube-v2/types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { API } from '../api/index';
import { removeCookie } from '../utils/cookie';

type CreateContextValue = {
  loading: boolean;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  profil: Profil;
  setProfil: React.Dispatch<React.SetStateAction<Profil>>;
};

const AuthContext = createContext<CreateContextValue>({
  loading: true,
  authenticated: false,
  setAuthenticated: () => {
    return;
  },
  accessToken: '',
  setAccessToken: () => {
    return;
  },
  profil: {} as Profil,
  setProfil: () => {
    return;
  },
});

const { Provider } = AuthContext;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [profil, setProfil] = useState<Profil>({} as Profil);

  useEffect(() => {
    async function verifyUserAuthentification() {
      const refreshToken = Cookies.get(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE as string,
      );

      if (!refreshToken) {
        setLoading(false);
        setAuthenticated(false);

        return;
      }

      try {
        const newAccessToken = await API.refreshAccessToken(refreshToken);

        setAccessToken(newAccessToken);
        setLoading(false);
        setAuthenticated(true);
      } catch (err) {
        removeCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE as string);

        setLoading(false);
        setAuthenticated(false);
      }
    }

    verifyUserAuthentification();
  }, [setLoading, setAuthenticated]);

  return (
    <Provider
      value={{
        loading,
        authenticated,
        setAuthenticated,
        accessToken,
        setAccessToken,
        profil,
        setProfil,
      }}
    >
      {children}
    </Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
