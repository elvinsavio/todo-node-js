import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ITodosModel extends Model<InferAttributes<ITodosModel>, InferCreationAttributes<ITodosModel>> {
  id: CreationOptional<string>;
  userId: CreationOptional<string>;
  title: string;
  description: CreationOptional<string>;
  endDate: CreationOptional<Date>;
  status: CreationOptional<"todo" | "doing" | "completed">;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}
