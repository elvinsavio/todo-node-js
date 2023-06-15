import dbConfig from "../../config/db.config";
import { Dialect, Sequelize } from "sequelize";
import userModel from "./user.model";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = userModel(sequelize, Sequelize);

export default db;
