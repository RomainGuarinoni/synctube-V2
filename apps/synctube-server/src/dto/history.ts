import * as yup from 'yup';

const hitoryDto = new yup.ObjectSchema({
  id: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  picture: yup.string().required(),
  channelTitle: yup.string().required(),
});
