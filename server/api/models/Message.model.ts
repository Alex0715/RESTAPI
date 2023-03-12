import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const MessageModel = sequelize.define(
  "messages",
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "messages",
    modelName: "messages",
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);
export default MessageModel;

MessageModel.sync();
