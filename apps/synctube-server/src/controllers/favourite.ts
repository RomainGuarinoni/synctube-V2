import type { Request, Response } from 'express';

import { IFavouriteSchema } from '../schemas/Favourite';
import { VideoService } from '../services/video';
import { validateBody } from '../validators/validateBody';

export class FavouriteController {
  static async getFavouriteVideo(req: Request, res: Response) {
    try {
      const { userId, limit, pageToken, searchInput } = await validateBody(
        'getFavouriteVideo',
        req.query,
      );

      const video = await VideoService.getUserFavouriteVideos(
        userId,
        parseInt(limit as unknown as string),
        pageToken,
        searchInput,
      );

      return res.status(200).json(video);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  static async addFavouriteVideo(req: Request, res: Response) {
    try {
      const body = await validateBody('addFavouriteVideo', req.body);

      const favouriteVideo: IFavouriteSchema = {
        ...body,
        date: new Date(),
      };

      const video = await VideoService.getUserFavouriteVideoById(
        favouriteVideo.userId,
        favouriteVideo.video.id,
      );

      if (video) {
        return res.sendStatus(200);
      }

      await VideoService.addUserFavouriteVideo(favouriteVideo);

      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
