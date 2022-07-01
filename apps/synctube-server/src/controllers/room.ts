import { Request, Response } from 'express';
import { RoomService } from '../services/room';
import { validateBody } from '../validators/validateBody';

export class RoomController {
  static async createRoom(req: Request, res: Response) {
    try {
      const { name, description, userId } = await validateBody(
        'createRoom',
        req.body,
      );

      const rooms = await RoomService.getUserRooms(userId);

      if (rooms.length > 5)
        return res.status(403).json({ err: 'E_ALREADY_5_ROOMS_CREATED' });

      await RoomService.createRoom(name, userId, description);

      return res.sendStatus(201);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  static async deleteRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await RoomService.deleteRoom(id);

      return res.sendStatus(200);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  static async modifyRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { name, description } = await validateBody('modifyRoom', req.body);

      await RoomService.modifyRoom(id, name, description);

      return res.sendStatus(200);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  static async getUserRooms(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const rooms = await RoomService.getUserRooms(id);

      return res.status(200).json(rooms);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  static async getUserVisitedRooms(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const rooms = await RoomService.getUserVisitedRooms(id);

      return res.status(200).json(rooms);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  static async getRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const room = await RoomService.getRoom(id);

      return res.status(200).json(room);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  static async joinRoom(req: Request, res: Response) {
    try {
      const { id, userId } = req.params;

      await RoomService.joinRoom(id, userId);

      return res.sendStatus(200);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  static async leaveRoom(req: Request, res: Response) {
    try {
      const { id, userId } = req.params;
      await RoomService.leaveRoom(id, userId);

      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }
}
