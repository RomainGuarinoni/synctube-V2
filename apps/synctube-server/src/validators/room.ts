import * as Yup from 'yup';

export const createRoomValidator = Yup.object({
  name: Yup.string().required().max(255),
  description: Yup.string().notRequired(),
  userId: Yup.string().required(),
});

export const roomIdValidator = Yup.object({
  id: Yup.string().required().max(255),
});
