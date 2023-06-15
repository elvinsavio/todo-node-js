import dbConfig from "../../config/db.config";
import { Dialect, Model, ModelCtor, Sequelize } from "sequelize";
import userModel from "./user/user.model";
import { IUserModel } from "./user/user.type";

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
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: userModel(sequelize),
};

export default db;
