import * as Yup from 'yup';

export const favouriteValidator = Yup.object({
  userId: Yup.string().required(),
});
