import Mongoose from 'mongoose';
import { Room } from '@synctube-v2/types';

const RoomSchema = new Mongoose.Schema<Room>({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
  },
  connectedUsers: {
    type: [{ type: String }],
  },
  visitors: {
    type: [{ type: String }],
  },
});

RoomSchema.virtual('ownerProfil', {
  ref: 'User',
  localField: 'owner',
  foreignField: 'id',
});

RoomSchema.virtual('connectedUsersList', {
  ref: 'User',
  localField: 'connectedUsers',
  foreignField: 'id',
});

RoomSchema.virtual('visitorsList', {
  ref: 'User',
  localField: 'visitors',
  foreignField: 'id',
});

RoomSchema.set('toObject', { virtuals: true });
RoomSchema.set('toJSON', { virtuals: true });

const RoomModel = Mongoose.model<Room>('Room', RoomSchema);

export { RoomModel };
