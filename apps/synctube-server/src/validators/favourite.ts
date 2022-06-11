import * as Yup from 'yup';
import { videoValidator } from './video';

export const getFavouriteVideoValidator = Yup.object({
  userId: Yup.string().required(),
});

export const addFavouriteVideoValidator = Yup.object({
  userId: Yup.string().required(),
  video: videoValidator,
});
