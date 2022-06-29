import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from '../components/shared/Button';
import { Loader } from '../components/shared/Loader';
import { useTranslation } from '../hooks/useTranslation';

import { useAuth } from '../context/AuthContext';
import { LoginErrors } from '../errors/LoginErrors';

export default function Login() {
  const {
    login: loginTranslation,
    errors: { internal },
  } = useTranslation();
  const { openOAuthPrompt, login, isAuthenticated } = useAuth();

  const router = useRouter();

  const [googleError, setGoogleError] = useState<string>('');
  const [googleLoading, setGoogleLoading] = useState(true);

  async function handleLoginGoogle() {
    setGoogleError('');
    setGoogleLoading(true);

    try {
      openOAuthPrompt();
    } catch (err) {
      console.error(err);
      setGoogleError('Something went wrong, try again later');
    }
  }

  useEffect(() => {
    async function loginUser(code: string) {
      try {
        await login(code);
        router.push('/');
      } catch (err) {
        console.log(err as Error);
        switch ((err as Error).message) {
          case LoginErrors.scopeMissing:
          case LoginErrors.allScopeNotAccepeted:
            setGoogleError(loginTranslation.errors.scope);
            break;
          case LoginErrors.profilMissing:
          case LoginErrors.tokenMissing:
          case LoginErrors.apiError:
          default:
            setGoogleError(internal);
            break;
        }
        setGoogleLoading(false);
      }
    }

    const query = router.query;

    const code = query['code'] as string | undefined;

    if (isAuthenticated()) {
      router.push('/');
      return;
    }

    if (!code) {
      setGoogleLoading(false);
      return;
    }

    loginUser(code);
  }, [router, login, loginTranslation, isAuthenticated, internal]);

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center text-zinc-400 text-xl">
      {googleLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mb-10">
            {loginTranslation.welcome}
            <span className="text-red-500 font-bold text-xl  tracking-[0.4em] mx-2  ">
              SYNCTUBE
            </span>
          </h2>
          <p className="mb-10 text-center">{loginTranslation.explanation} </p>
          <Button size="large" onClick={handleLoginGoogle}>
            {loginTranslation.googleText}
          </Button>
          {googleError && <p className="mt-10 text-red-500"> {googleError}</p>}
        </>
      )}
    </div>
  );
}
