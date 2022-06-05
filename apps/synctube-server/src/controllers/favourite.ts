import type { Request, Response } from 'express';

import { getUserFavouriteVideo } from '../services/video';

export async function getFavouriteVideo(req: Request, res: Response) {
  const video = getUserFavouriteVideo('5410');

  return res.status(200).json(video);
}
