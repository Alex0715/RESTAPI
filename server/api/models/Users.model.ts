import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const UsersModel = sequelize.define(
  "users",
  {
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    modelName: "Users",
    indexes: [
      {
        unique: true,
        fields: ["username"],
      },
    ],
  }
);
export default UsersModel;
