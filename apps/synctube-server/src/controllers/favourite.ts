import type { Request, Response } from 'express';

import { IFavouriteSchema } from '../schemas/Favourite';
import {
  getUserFavouriteVideoById,
  getUserFavouriteVideos,
  addUserFavouriteVideo,
} from '../services/video';
import { validateBody } from '../validators/validateBody';

export async function getFavouriteVideo(req: Request, res: Response) {
  try {
    await validateBody('getFavouriteVideo', req.body);

    const video = getUserFavouriteVideos('5410');

    return res.status(200).json(video);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function addFavouriteVideo(req: Request, res: Response) {
  try {
    await validateBody('addFavouriteVideo', req.body);

    const favouriteVideo: IFavouriteSchema = {
      userId: req.body.userId,
      video: req.body.video,
      date: new Date(),
    };

    const video = await getUserFavouriteVideoById(
      favouriteVideo.userId,
      favouriteVideo.video.id,
    );

    if (video) {
      return res.sendStatus(200);
    }

    await addUserFavouriteVideo(favouriteVideo);

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
