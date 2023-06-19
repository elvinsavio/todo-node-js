import { DataTypes, Sequelize } from "sequelize";
import { IChecklistModel } from "./checklist.type";

export default function (sequelize: Sequelize) {
  const CheckList = sequelize.define<IChecklistModel>("checklists", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return CheckList;
}
