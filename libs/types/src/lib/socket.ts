import { Profil } from './auth';

export interface ClientToServerEvents {
  userJoinRoom: (roomId: string, user: Profil) => void;
  userLeaveRoom: (roomId: string, user: Profil) => void;
}

export interface ServerToClientEvents {
  newUserInRoom: (user: Profil) => void;
  userLeaveRoom: (user: Profil) => void;
}
