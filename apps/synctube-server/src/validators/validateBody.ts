import { favouriteValidator } from './favourite';
import { userProfilValidator } from './user';

const VALIDATORS = {
  getFavouriteVideo: favouriteValidator,
  loginUser: userProfilValidator,
};

export async function validateBody(
  schema: keyof typeof VALIDATORS,
  body: Record<string, unknown>,
): Promise<void> {
  try {
    await VALIDATORS[schema].validate(body);
  } catch (err) {
    const error = { err: 'E_MALFORMED_BODY', stack: (err as Error).message };
    throw error;
  }
}
