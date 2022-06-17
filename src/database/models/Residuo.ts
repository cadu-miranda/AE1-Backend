import { DataTypes, Model } from "sequelize";
import { IResiduo } from "../../interfaces/models/IResiduo";
import db from "../db";

class Residuo extends Model<IResiduo> {
  declare id: number;

  declare name: string;

  declare collected: boolean;
}

Residuo.init(
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
    collected: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  { tableName: "residuos", sequelize: db }
);

export default Residuo;
