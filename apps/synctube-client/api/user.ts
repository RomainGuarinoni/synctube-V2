import axios from 'axios';

import { Profil } from '@synctube-v2/types';
import { routes } from './routes';

export async function loginUser(profil: Profil) {
  await axios.post(routes.user.login, profil);
}
