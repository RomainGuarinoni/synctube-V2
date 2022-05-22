import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';

interface RouteGuardProps {
  children: React.ReactNode;
}

type AuthState = 'authenticated' | 'unauthenticated';

const publicPath = ['/login'];

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>();
  const [loading, setLoading] = useState(true);

  const checkPath = useCallback(() => {
    setLoading(true);

    const refreshToken = Cookies.get(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE as string,
    );

    setAuthState(refreshToken ? 'authenticated' : 'unauthenticated');

    const path = router.pathname;

    if (authState === 'authenticated' && publicPath.includes(path)) {
      router.push('/');
      setLoading(false);

      return;
    }

    if (authState === 'unauthenticated' && !publicPath.includes(path)) {
      router.push('/login');
      setLoading(false);

      return;
    }
    setLoading(false);
  }, [router, authState]);

  useEffect(() => {
    checkPath();

    router.events.on('routeChangeComplete', checkPath);

    return () => {
      router.events.off('routeChangeComplete', checkPath);
    };
  }, [checkPath, router.events]);

  return (
    <>
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!loading && children}
    </>
  );
}
