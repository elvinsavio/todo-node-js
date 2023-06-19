import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface IChecklistModel
  extends Model<InferAttributes<IChecklistModel>, InferCreationAttributes<IChecklistModel>> {
  id: CreationOptional<string>;
  userId: CreationOptional<string>;
  title: string;
}
