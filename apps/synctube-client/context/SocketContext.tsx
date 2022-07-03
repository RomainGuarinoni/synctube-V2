import { Socket } from 'socket.io';
import { io } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '@synctube-v2/types';
import React, { createContext, useContext, useEffect } from 'react';
import { apiUrl } from '../config/api';
import { useAuth } from './AuthContext';
import { useRoom } from './RoomContext';

type SocketContextValue = {
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
};

const socket = io(apiUrl || '') as unknown as Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;

const socketContext = createContext<SocketContextValue>({
  joinRoom: () => {
    return;
  },
  leaveRoom: () => {
    return;
  },
});

const { Provider } = socketContext;

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authState } = useAuth();

  const { newUserInRoom, userLeaveRoom } = useRoom();

  const joinRoom = (roomId: string) => {
    if (!authState.profil) throw new Error('no profil');

    socket.emit('userJoinRoom', roomId, authState.profil);
  };

  const leaveRoom = (roomId: string) => {
    if (!authState.profil) throw new Error('no profil');

    socket.emit('userLeaveRoom', roomId, authState.profil);
  };

  useEffect(() => {
    console.log(socket);
    socket.on('newUserInRoom', newUserInRoom);
    socket.on('userLeaveRoom', userLeaveRoom);

    return () => {
      socket.off('newUserInRoom', newUserInRoom);
      socket.off('userLeaveRoom', userLeaveRoom);
    };
  }, [newUserInRoom, userLeaveRoom]);

  return <Provider value={{ joinRoom, leaveRoom }}>{children}</Provider>;
};

export const useSocket = () => useContext(socketContext);
