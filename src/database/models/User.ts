import { DataTypes, Model } from "sequelize";
import db from "../db";
import { IUser } from "../../interfaces/models/IUser";

class User extends Model<IUser> {
  declare id: number;

  declare name: string;

  declare email: string;

  declare password: string;

  declare phone: string;

  declare role: string | null;

  declare avatar: string | null;

  declare passwordResetToken: string;

  declare passwordResetExpires: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User",
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "users", sequelize: db }
);

export default User;
