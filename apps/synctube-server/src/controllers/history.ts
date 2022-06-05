import type { Request, Response } from 'express';

import { getRoomHistoryVideo } from '../services/video';

export async function getHistoryVideo(req: Request, res: Response) {
  const video = getRoomHistoryVideo('5410');

  return res.status(200).json(video);
}
