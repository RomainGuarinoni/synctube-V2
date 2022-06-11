import Mongoose from 'mongoose';
import { Profil } from '@synctube-v2/types';

export interface IUSerSchema extends Profil {
  resgisteredAt: Date;
}

const UserSchema = new Mongoose.Schema<IUSerSchema>({
  id: {
    type: 'String',
    require: true,
    index: true,
  },
  familyName: {
    type: 'String',
    require: true,
  },
  givenName: {
    type: 'String',
    require: true,
  },
  picture: {
    type: 'String',
    require: true,
  },
  resgisteredAt: {
    type: 'Date',
    required: true,
  },
});

const UserModel = Mongoose.model<IUSerSchema>('User', UserSchema);

export { UserModel };
