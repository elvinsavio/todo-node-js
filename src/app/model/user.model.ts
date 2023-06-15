export default function (sequelize: any, Sequelize: any) {
  const User = sequelize.define("users", {
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
