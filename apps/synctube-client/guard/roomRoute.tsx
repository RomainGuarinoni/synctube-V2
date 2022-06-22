import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Loader } from '../components/shared/Loader';
import { useRoom } from '../context/RoomContext';

export function roomRoute(Component: FC) {
  function RoomComponent(): JSX.Element {
    const { isUserInRoom } = useRoom();
    const router = useRouter();

    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    useEffect(() => {
      if (!isUserInRoom()) router.push('/login');

      setShowLoadingScreen(false);
    }, [isUserInRoom, router]);

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

  return RoomComponent;
}
