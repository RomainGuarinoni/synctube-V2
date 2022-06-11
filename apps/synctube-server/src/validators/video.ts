import * as Yup from 'yup';

export const videoValidator = Yup.object({
  id: Yup.string().required(),
  title: Yup.string().required(),
  description: Yup.string().required(),
  picture: Yup.string().required(),
  channelTitle: Yup.string().required(),
  publishedAt: Yup.string().required(),
});
