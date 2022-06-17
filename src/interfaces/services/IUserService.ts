/* eslint-disable no-unused-vars */
import { IUser } from "../models/IUser";

export interface IUserService {
  findByEmail(email: IUser["email"]): Promise<IUser>;
  findByPk(id: IUser["id"]): Promise<IUser>;
  getAll(): Promise<IUser[]>;
  update(id: number, data: IUser): Promise<IUser>;
  destroy(id: number): Promise<void>;
  store(
    data: Pick<IUser, "name" | "email" | "phone" | "password">
  ): Promise<IUser>;
}
