import Mongoose from 'mongoose';
import { Video } from '@synctube-v2/types';

import { VideoSchema } from './Video';

export interface IFavouriteSchema {
  userId: string;
  video: Video;
  date: Date;
}

const FavouriteSchema = new Mongoose.Schema<IFavouriteSchema>({
  userId: {
    type: 'string',
    required: true,
    index: true,
  },
  video: {
    type: VideoSchema,
    required: true,
  },
  date: {
    type: 'Date',
    required: true,
  },
});

const FavouriteModel = Mongoose.model<IFavouriteSchema>(
  'Favourite',
  FavouriteSchema,
);

export { FavouriteModel };
