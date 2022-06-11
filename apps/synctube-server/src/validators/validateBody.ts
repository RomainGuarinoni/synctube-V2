import {
  getFavouriteVideoValidator,
  addFavouriteVideoValidator,
} from './favourite';
import { userProfilValidator } from './user';

const VALIDATORS = {
  getFavouriteVideo: getFavouriteVideoValidator,
  addFavouriteVideo: addFavouriteVideoValidator,
  loginUser: userProfilValidator,
};

export async function validateBody(
  schema: keyof typeof VALIDATORS,
  body: Record<string, unknown>,
): Promise<void> {
  try {
    await VALIDATORS[schema].validate(body);
  } catch (err) {
    console.error(`\nValidation error on ${schema} schema`, body, err, '\n');
    const error = { err: 'E_MALFORMED_BODY', stack: (err as Error).message };
    throw error;
  }
}
