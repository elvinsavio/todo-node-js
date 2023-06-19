import dbConfig from "../../config/db.config";
import { Dialect, Sequelize } from "sequelize";
import userModel from "./user/user.model";
import todoModel from "./todo/todo.model";
import checklistModel from "./checklist/checklist.model";
import checklistItemModel from "./checklistItem/checklistItem.model";

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
  Checklist: checklistModel(sequelize),
  CheckListItem: checklistItemModel(sequelize),
};

// relations
db.Todo.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

db.Checklist.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

db.CheckListItem.belongsTo(db.Checklist, {
  foreignKey: "checkListId",
  as: "checklist",
});

export default db;
