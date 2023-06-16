import dbConfig from "../../config/db.config";
import { Dialect, Sequelize } from "sequelize";
import userModel from "./user/user.model";
import todoModel from "./todo/todo.model";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {
  Sequelize,
  sequelize,
  User: userModel(sequelize),
  Todo: todoModel(sequelize),
};

db.Todo.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

export default db;
