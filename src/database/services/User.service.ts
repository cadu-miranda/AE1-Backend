import bcrypt from "bcrypt";
import { IUser } from "../../interfaces/models/IUser";
import { IUserService } from "../../interfaces/services/IUserService";
import User from "../models/User";

class UserService implements IUserService {
  async store(
    data: Pick<IUser, "email" | "name" | "password" | "phone">
  ): Promise<IUser> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(data.password, salt);

    const user = await User.create({ ...data, password: hashedPassword });

    user.password = undefined;

    return user;
  }

  async getAll(): Promise<IUser[]> {
    const users = await User.findAll({
      where: [{ role: "User" }],
    });

    return users;
  }

  findByPk(id: number): Promise<IUser> {
    return User.findByPk(id);
  }

  findByEmail(email: string): Promise<IUser> {
    return User.findOne({ where: { email } });
  }

  async update(id: number, data: IUser): Promise<IUser> {
    await User.update(data, { where: { id } });

    const updatedUser = await User.findByPk(id);

    return updatedUser;
  }

  async destroy(id: number): Promise<void> {
    await User.destroy({ where: { id } });
  }
}

export default UserService;
