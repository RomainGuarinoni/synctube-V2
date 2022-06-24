import { Profil } from './auth';

export interface Room {
  _id: string;
  owner: string;
  name: string;
  description?: string;
  connectedUsers: string[];
  visitors: string[];
  ownerProfil?: Profil;
  connectedUsersList?: Profil[];
  visitorsList?: Profil[];
  createdAt: string;
}
