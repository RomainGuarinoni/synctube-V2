import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
}

const publicPath = ['/login'];

export function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  const [routeStartLoading, SetRouteStartLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // function routeStartLoading() {
    //   SetRouteStartLoading(true);
    // }

    async function checkPath() {
      // console.log('loading', isLoading());
      // console.log('is auth', isAuthenticated());
      // console.log('\n -- \n');

      if (isLoading()) {
        return;
      }

      const path = router.pathname;

      if (isAuthenticated() && publicPath.includes(path)) {
        SetRouteStartLoading(false);
        router.push('/');
        return;
      }

      if (!isAuthenticated() && !publicPath.includes(path)) {
        SetRouteStartLoading(false);
        router.push('/login');
        return;
      }
    }
    checkPath();

    // router.events.on('routeChangeStart', routeStartLoading);
    router.events.on('routeChangeComplete', checkPath);

    return () => {
      // router.events.off('routeChangeStart', routeStartLoading);
      router.events.off('routeChangeComplete', checkPath);
    };
  }, [router, isAuthenticated, isLoading]);

  return (
    <>
      {(isLoading() || routeStartLoading) && (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!isLoading() && children}
    </>
  );
}
