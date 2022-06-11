import { UserModel, IUSerSchema } from '../schemas/User';

export async function getUserById(userId: string): Promise<IUSerSchema> {
  const user = await UserModel.findOne({ id: userId });

  return user;
}

export async function createUser(user: IUSerSchema): Promise<void> {
  const newUser = new UserModel(user);

  await newUser.save();
}
