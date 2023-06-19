import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export type ITodoStatus = "todo" | "doing" | "completed";

export interface ITodosModel extends Model<InferAttributes<ITodosModel>, InferCreationAttributes<ITodosModel>> {
  id: CreationOptional<string>;
  userId: CreationOptional<string>;
  title: string;
  description: CreationOptional<string>;
  endDate: CreationOptional<Date>;
  status: CreationOptional<ITodoStatus>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}
