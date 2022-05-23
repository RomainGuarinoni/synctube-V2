import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
}

const publicPath = ['/login'];

export function RouteGuard({ children }: RouteGuardProps) {
  const { loading, authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function checkPath() {
      if (loading) {
        return;
      }

      const path = router.pathname;

      if (authenticated && publicPath.includes(path)) {
        router.push('/');
        return;
      }

      if (!authenticated && !publicPath.includes(path)) {
        router.push('/login');
        return;
      }
    }
    checkPath();

    router.events.on('routeChangeComplete', checkPath);

    return () => {
      router.events.off('routeChangeComplete', checkPath);
    };
  }, [router, authenticated, loading]);

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
