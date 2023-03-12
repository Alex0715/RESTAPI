import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const BlogsModel = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
  },
  {
    tableName: "blogs",
    modelName: "blogs",
    indexes: [
      {
        unique: true,
        fields: ["title"],
      },
    ],
  }
);
export default BlogsModel;
