import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/AuthContext';

export function authenticatedRoute(Component: FC) {
  function AuthComponent(): JSX.Element {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    useEffect(() => {
      if (isLoading()) return;

      if (!isAuthenticated()) router.push('/login');

      setShowLoadingScreen(false);
    }, [isAuthenticated, isLoading, router]);

    return (
      <>
        {showLoadingScreen ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <Component />
        )}
      </>
    );
  }

  return AuthComponent;
}
