const { DataTypes } = require("sequelize");

export default function (sequelize: any) {
  const Users = sequelize.define("users", {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: true },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: true },
  });
  return Users;
}
