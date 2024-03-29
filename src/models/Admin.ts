import { db } from "../db";
import { IAdmin, TypeRole } from '../DTO/IAdmin';
import { Model, DataTypes } from "sequelize";

export class Admin extends Model<IAdmin> implements IAdmin {
  id!: string;
  user!: string;
  email!: string;
  password!: string;
  // role!: TypeRole
}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true
    },
    // role: {
    //   type: DataTypes.ENUM(TypeRole.Admin),
    //   defaultValue: TypeRole.Admin,
    // },
  },
  {
    sequelize: db,
    modelName: "admin",
    timestamps: false,
  }
);
