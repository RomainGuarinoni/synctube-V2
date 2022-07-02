import React, { createContext, useContext, useState } from 'react';
import { Video, Room, Profil } from '@synctube-v2/types';
import axios from 'axios';
import { routes } from '../api/routes';
import { useAuth } from './AuthContext';

type RoomContextValue = {
  isUserInRoom: () => boolean;
  getCurrentRoom: () => Room | null;
  isUserRoomOwner: (user: Profil) => boolean;
  getCurrentVideo: () => Video | null;
  joinRoom: (room: Room) => Promise<void>;
  setVideo: (video: Video) => void;
  leaveRoom: () => void;
};

const RoomContext = createContext<RoomContextValue>({
  isUserInRoom: () => false,
  getCurrentRoom: () => null,
  isUserRoomOwner: () => false,
  getCurrentVideo: () => null,
  joinRoom: async (room: Room) => {
    return;
  },
  setVideo: () => {
    return;
  },
  leaveRoom: () => {
    return;
  },
});

const { Provider } = RoomContext;

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    authState: { profil },
  } = useAuth();

  const [room, setRoom] = useState<Room | null>(null);
  const [video, setVideo] = useState<Video | null>(null);

  const isUserInRoom = () => !!room;

  const getCurrentRoom = () => room;

  const isUserRoomOwner = (user: Profil) => room?.ownerProfil?.id === user.id;

  const getCurrentVideo = () => video;

  const joinRoom = async (room: Room) => {
    if (!profil) {
      throw new Error('No profil set');
    }

    if (!room.visitors.includes(profil.id)) {
      await axios.post(routes.rooms.joinRoom(room._id, profil.id));
    }

    setRoom(room);
  };

  const leaveRoom = () => {
    setRoom(null);
  };

  return (
    <Provider
      value={{
        isUserInRoom,
        getCurrentRoom,
        isUserRoomOwner,
        getCurrentVideo,
        joinRoom,
        setVideo,
        leaveRoom,
      }}
    >
      {children}
    </Provider>
  );
};

export const useRoom = () => useContext(RoomContext);
