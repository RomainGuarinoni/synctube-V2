import { Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from '@synctube-v2/types';
import { roomEvents } from './room';

export const initSocketEvent = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
) => {
  console.log('socket connecting');
  roomEvents(socket);

  socket.on('disconnect', (data) => {
    // DO SOMETHING
    console.warn(data);
    return;
  });

  socket.on('error', (err) => {
    // DO SOMETHING
    console.error(err);
    return;
  });
};
