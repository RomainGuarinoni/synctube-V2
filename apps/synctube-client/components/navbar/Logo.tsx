import { useRouter } from 'next/router';
import React from 'react';
import { useRoom } from '../../context/RoomContext';

export const Logo: React.FC = () => {
  const router = useRouter();

  const { isUserInRoom, leaveRoom } = useRoom();

  const handleLogoClick = () => {
    console.log(isUserInRoom());
    if (isUserInRoom()) {
      leaveRoom();
    }
    router.push('/');
  };

  return (
    <h1
      id="synctube-logo"
      title="synctube"
      className="text-red-500 font-bold text-xl  tracking-[0.4em] cursor-pointer hidden lg:block "
      onClick={handleLogoClick}
    >
      SYNCTUBE
    </h1>
  );
};
