import * as Yup from 'yup';

export const createRoomValidator = Yup.object({
  name: Yup.string().required().max(255),
  description: Yup.string().notRequired(),
  userId: Yup.string().required(),
});

export const modifyRoomValidator = Yup.object({
  name: Yup.string().required().max(255),
  description: Yup.string().notRequired(),
});

export const roomIdValidator = Yup.object({
  id: Yup.string().required().max(255),
});

export const getVisitedRoomValidator = Yup.object({
  pageToken: Yup.string().notRequired(),
  limit: Yup.number().min(1).max(25).required(),
  searchInput: Yup.string().notRequired(),
});
