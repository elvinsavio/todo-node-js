export default function (sequelize: any, Sequelize: any) {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
  });

  return User;
}
