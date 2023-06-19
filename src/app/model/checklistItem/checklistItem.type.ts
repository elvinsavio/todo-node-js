import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface IChecklistItemModel
  extends Model<InferAttributes<IChecklistItemModel>, InferCreationAttributes<IChecklistItemModel>> {
  id: CreationOptional<string>;
  checkListId: CreationOptional<string>;
  title: string;
  status: CreationOptional<boolean>;
}
