import { ClientToServerEvents, ServerToClientEvents } from '@synctube-v2/types';
import { Socket } from 'socket.io';

export const roomEvents = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
) => {
  socket.on('userJoinRoom', (roomId, newUser) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('newUserInRoom', newUser);
  });

  socket.on('userLeaveRoom', (roomId, user) => {
    socket.leave(roomId);
    socket.broadcast.to(roomId).emit('userLeaveRoom', user);
  });
};
