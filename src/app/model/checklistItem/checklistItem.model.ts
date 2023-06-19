import { DataTypes, Sequelize } from "sequelize";
import { IChecklistItemModel } from "./checklistItem.type";

export default function (sequelize: Sequelize) {
  const CheckListItem = sequelize.define<IChecklistItemModel>("checklistItems", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    checkListId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "checklists",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return CheckListItem;
}
