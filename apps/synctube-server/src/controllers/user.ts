import { Profil } from '@synctube-v2/types';
import { Request, Response } from 'express';

import { validateBody } from '../validators/validateBody';
import { IUSerSchema } from '../schemas/User';
import { createUser, getUserById } from '../services/user';

export async function loginUser(req: Request, res: Response) {
  try {
    await validateBody('loginUser', req.body);

    const profil: Profil = req.body;

    console.log(profil);

    const user = await getUserById(profil.id);

    if (user) {
      console.log('USER FIND');

      return res.sendStatus(200);
    }

    const newUser: IUSerSchema = { ...profil, resgisteredAt: new Date() };
    await createUser(newUser);

    console.log('USER CREATED');
    return res.sendStatus(200);
  } catch (err) {
    res.status(400).json(err);
  }
}
