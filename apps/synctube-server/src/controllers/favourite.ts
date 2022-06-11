import type { Request, Response } from 'express';

import { getUserFavouriteVideo } from '../services/video';
import { validateBody } from '../validators/validateBody';

export async function getFavouriteVideo(req: Request, res: Response) {
  try {
    await validateBody('getFavouriteVideo', req.body);

    const video = getUserFavouriteVideo('5410');

    return res.status(200).json(video);
  } catch (err) {
    res.status(500).json(err);
  }
}
