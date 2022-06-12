import * as Yup from 'yup';
import { videoValidator } from './video';

export const getFavouriteVideoValidator = Yup.object({
  userId: Yup.string().required(),
  pageToken: Yup.string().notRequired(),
  limit: Yup.number().min(1).max(25).required(),
  searchInput: Yup.string().notRequired(),
});

export const addFavouriteVideoValidator = Yup.object({
  userId: Yup.string().required(),
  video: videoValidator,
});
