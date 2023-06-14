import { Users } from "../src/model";
import logger from "./logger";

const { Sequelize } = require("sequelize");

export default function (url: string, callback: () => void) {
  const sequelize = new Sequelize(url, {
    dialect: "postgres",
  });

  async function sync(sequelize: any) {
    return await sequelize.sync({ force: true });
  }

  const tryAuth = async () => await sequelize.authenticate();
  tryAuth()
    .then(() => {
      logger.info("Database connected", "DATABASE", "db.ts");

      Users(sequelize);

      try {
        sync(sequelize);
        logger.info("Models created successfully.", "DATABASE", "db.ts");
      } catch (error) {
        logger.error(`Error creating model: ${error}`, "DATABASE", "db.ts");
      }
      callback();
    })
    .catch((err: Error) => {
      logger.error(err.message, "DATABASE", "index.ts");
    });
}
