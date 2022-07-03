import { useRouter } from 'next/router';
import React from 'react';
import { useRoom } from '../../context/RoomContext';
import { useSocket } from '../../context/SocketContext';

export const Logo: React.FC = () => {
  const router = useRouter();

  const { isUserInRoom, leaveRoom, getCurrentRoom } = useRoom();
  const { leaveRoom: leaveRoomSocket } = useSocket();

  const handleLogoClick = () => {
    if (isUserInRoom()) {
      leaveRoomSocket(getCurrentRoom()!._id);
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
