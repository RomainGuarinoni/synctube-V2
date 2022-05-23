import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { useTranslation } from '../hooks/useTranslation';
import { API } from '../api';

import { setCookie } from '../utils/cookie';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useTranslation();
  const { setAccessToken, setAuthenticated, setProfil } = useAuth();

  const router = useRouter();

  const [googleError, setGoogleError] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(true);

  async function handleLoginGoogle() {
    setGoogleError(false);
    setGoogleLoading(true);

    try {
      const redirect_url = await API.LoginWithGoogle();

      window.location.href = redirect_url;
    } catch (err) {
      console.log(err);
      setGoogleError(true);
    }
  }

  useEffect(() => {
    setGoogleLoading(true);

    async function getCredentialsFromCode(code: string) {
      try {
        const tokens = await API.GetAuthTokens(code);

        setCookie(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE as string,
          tokens.refresh_token,
          { isSession: false },
        );

        setAccessToken(tokens.access_token);

        setProfil(tokens.profil);

        setAuthenticated(true);

        router.push('/index');
      } catch (err) {
        console.log('error on use Effect login page', err);
        setGoogleLoading(false);

        setGoogleError(true);
        return;
      }
    }

    const query = router.query;

    const code = query['code'] as string | undefined;

    if (!code) {
      setGoogleLoading(false);
      return;
    }

    getCredentialsFromCode(code);
  }, [router]);

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center text-zinc-400 text-xl">
      {googleLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mb-10">
            {login.welcome}
            <span className="text-red-500 font-bold text-xl  tracking-[0.4em] mx-2  ">
              SYNCTUBE
            </span>
          </h2>
          <p className="mb-10">{login.explanation} </p>
          <Button
            label={login.googleText}
            size="medium"
            onClick={handleLoginGoogle}
          />
          {googleError && <p className="mt-10 text-red-500"> {login.error} </p>}
        </>
      )}
    </div>
  );
}
