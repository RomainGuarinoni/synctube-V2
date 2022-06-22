import * as Yup from 'yup';

export const userProfilValidator = Yup.object({
  id: Yup.string().required(),
  givenName: Yup.string().required(),
  familyName: Yup.string().required(),
  picture: Yup.string().required(),
});

export const userIdValidator = Yup.object({
  userId: Yup.string().required(),
});
