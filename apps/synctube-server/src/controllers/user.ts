import { Request, Response } from 'express';

import { validateBody } from '../validators/validateBody';
import { IUSerSchema } from '../models/User';
import { UserService } from '../services/user';

export class UserController {
  static async loginUser(req: Request, res: Response) {
    try {
      const profil = await validateBody('loginUser', req.body);

      const user = await UserService.getUserById(profil.id);

      if (user) {
        return res.sendStatus(200);
      }

      const newUser: IUSerSchema = { ...profil, resgisteredAt: new Date() };
      await UserService.createUser(newUser);

      return res.sendStatus(200);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
