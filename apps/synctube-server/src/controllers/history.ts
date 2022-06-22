import type { Request, Response } from 'express';

import { VideoService } from '../services/video';

export class HistoryController {
  static async getHistoryVideo(req: Request, res: Response) {
    const video = VideoService.getRoomHistoryVideo('5410');

    return res.status(200).json(video);
  }
}
