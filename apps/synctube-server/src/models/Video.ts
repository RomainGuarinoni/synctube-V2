import Mongoose from 'mongoose';
import { Video } from '@synctube-v2/types';

const VideoSchema = new Mongoose.Schema<Video>({
  id: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  picture: {
    required: true,
    type: String,
  },
  channelTitle: {
    required: true,
    type: String,
  },
  publishedAt: {
    required: true,
    type: String,
  },
});

export { VideoSchema };
