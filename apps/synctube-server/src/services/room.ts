import { Room } from '@synctube-v2/types';
import Mongoose from 'mongoose';
import { RoomModel } from '../models/Room';

export class RoomService {
  static async getRoom(_id: string) {
    const room = await RoomModel.findOne({ _id })
      .populate('ownerProfil')
      .populate('connectedUsersList')
      .populate('visitorsList');

    return room;
  }

  static async createRoom(
    name: string,
    userId: string,
    description?: string,
  ): Promise<void> {
    const room = new RoomModel({
      name,
      description,
      owner: userId,
      connectedUser: [],
      visitors: [],
    });

    await room.save();
  }

  static async deleteRoom(roomId: string): Promise<void> {
    await RoomModel.deleteOne({ _id: new Mongoose.Types.ObjectId(roomId) });
  }

  static async modifyRoom(
    roomId: string,
    name: string,
    description?: string,
  ): Promise<void> {
    await RoomModel.updateOne(
      { _id: new Mongoose.Types.ObjectId(roomId) },
      { name, description: description || '' },
    );
  }

  static async getUserRooms(userId: string): Promise<Room[]> {
    const userRooms = await RoomModel.find({ owner: userId }).populate(
      'ownerProfil',
    );

    return userRooms;
  }

  static async getUserVisitedRooms(userId: string): Promise<Room[]> {
    const visitedRooms = await RoomModel.find({
      visitors: userId,
      owner: { $ne: userId },
    }).populate('ownerProfil');

    return visitedRooms;
  }

  static async joinRoom(roomId: string, userId: string): Promise<void> {
    await RoomModel.updateOne(
      {
        _id: new Mongoose.Types.ObjectId(roomId),
      },
      {
        $addToSet: {
          connectedUsers: userId,
          visitors: userId,
        },
      },
    );
  }

  static async leaveRoom(roomId: string, userId: string): Promise<void> {
    await RoomModel.updateOne(
      {
        _id: new Mongoose.Types.ObjectId(roomId),
      },
      {
        $pull: {
          connectedUsers: userId,
        },
      },
    );
  }
}
