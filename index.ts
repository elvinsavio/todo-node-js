import express, { Express } from "express";
import dotenv from "dotenv";

import logger from "./utils/logger";
import route from "./src/router";
import db from "./utils/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

function main() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", route);

  app.listen(port, () => {
    logger.info(`Server started`, "SERVER", "index.ts");
  });
}

db(process.env.DATABASE_URL!, main);
