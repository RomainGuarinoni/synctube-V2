import { Profil } from './auth';

export interface Room {
  _id: string;
  owner: Profil;
  name: string;
  description?: string;
  connectedUsers: [Profil];
  visitors: [Profil];
  ownerProfil?: Profil;
  connectedUsersList?: [Profil];
  visitorsList?: [Profil];
  createdAt: string;
}
