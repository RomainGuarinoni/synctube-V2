import axios from 'axios';

import { Profil } from '@synctube-v2/types';

export async function loginUser(profil: Profil) {
  await axios.post('/api/user/login', profil);
}
