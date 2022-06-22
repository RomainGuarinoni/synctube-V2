import { UserModel, IUSerSchema } from '../schemas/User';

export class UserService {
  static async createUser(user: IUSerSchema): Promise<void> {
    const newUser = new UserModel(user);

    await newUser.save();
  }
  static async getUserById(userId: string): Promise<IUSerSchema> {
    const user = await UserModel.findOne({ id: userId });

    return user;
  }
}
