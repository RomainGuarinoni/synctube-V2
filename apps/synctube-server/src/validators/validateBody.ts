import * as Yup from 'yup';

import {
  getFavouriteVideoValidator,
  addFavouriteVideoValidator,
} from './favourite';
import { userProfilValidator, userIdValidator } from './user';
import { createRoomValidator, roomIdValidator } from './room';

const VALIDATORS = {
  getFavouriteVideo: getFavouriteVideoValidator,
  addFavouriteVideo: addFavouriteVideoValidator,
  loginUser: userProfilValidator,
  createRoom: createRoomValidator,
  getUserRooms: userIdValidator,
  getUserVisitedRooms: userIdValidator,
  getRoom: roomIdValidator,
};

type ValidateBodySchemaParam = keyof typeof VALIDATORS;

type SchemaType<T> = T extends 'getFavouriteVideo'
  ? Yup.InferType<typeof VALIDATORS['getFavouriteVideo']>
  : T extends 'addFavouriteVideo'
  ? Yup.InferType<typeof VALIDATORS['addFavouriteVideo']>
  : T extends 'loginUser'
  ? Yup.InferType<typeof VALIDATORS['loginUser']>
  : T extends 'createRoom'
  ? Yup.InferType<typeof VALIDATORS['createRoom']>
  : T extends 'getUserRooms'
  ? Yup.InferType<typeof VALIDATORS['getUserRooms']>
  : T extends 'getUserVisitedRooms'
  ? Yup.InferType<typeof VALIDATORS['getUserVisitedRooms']>
  : T extends 'getRoom'
  ? Yup.InferType<typeof VALIDATORS['getRoom']>
  : never;

export async function validateBody<T extends ValidateBodySchemaParam>(
  schema: T,
  body: Record<string, unknown>,
): Promise<SchemaType<T>> {
  try {
    await VALIDATORS[schema].validate(body);
    return body as SchemaType<T>;
  } catch (err) {
    console.error(`\nValidation error on ${schema} schema`, body, err, '\n');
    const error = {
      err: 'E_MALFORMED_BODY',
      stack: (err as Error).message,
      status: 400,
    };
    throw error;
  }
}
