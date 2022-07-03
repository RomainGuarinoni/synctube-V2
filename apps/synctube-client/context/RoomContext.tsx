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
  newUserInRoom: (newUser: Profil) => void;
  userLeaveRoom: (newUser: Profil) => void;
};

const roomContext = createContext<RoomContextValue>({
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
  newUserInRoom: () => {
    return;
  },
  userLeaveRoom: () => {
    return;
  },
});

const { Provider } = roomContext;

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

    await axios.post(routes.rooms.joinRoom(room._id, profil.id));

    setRoom({
      ...room,
      connectedUsers: [...room.connectedUsers, profil.id],
      connectedUsersList: [...room.connectedUsersList!, profil],
    });
  };

  const leaveRoom = async () => {
    if (!profil || !room) {
      throw new Error('No profil set');
    }

    await axios.post(routes.rooms.leaveRoom(room._id, profil.id));

    setRoom(null);
  };

  const newUserInRoom = (newUser: Profil) => {
    console.log('a  user enter the room');
    console.log(newUser);

    if (!room || !room.connectedUsersList) {
      return;
    }

    console.log({
      ...room,
      connectedUsersList: [...room.connectedUsersList, newUser],
      connectedUsers: [...room.connectedUsers, newUser.id],
    });

    setRoom({
      ...room,
      connectedUsersList: [...room.connectedUsersList, newUser],
      connectedUsers: [...room.connectedUsers, newUser.id],
    });
  };

  const userLeaveRoom = (user: Profil) => {
    if (!room || !room.connectedUsersList) return;

    console.log('a user leave room', user);

    setRoom({
      ...room,
      connectedUsersList: room.connectedUsersList.filter(
        (user) => user.id !== user.id,
      ),
    });
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
        newUserInRoom,
        userLeaveRoom,
      }}
    >
      {children}
    </Provider>
  );
};

export const useRoom = () => useContext(roomContext);
