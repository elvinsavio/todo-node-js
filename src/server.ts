import express from "express";
import cors from "cors";
import { SequelizeScopeError } from "sequelize";

import db from "./app/model/model";
import router from "./app/router/router";
const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

db.sequelize
  .sync()
  .then(() => {
    // eslint-disable-next-line no-console
    console.clear();
    console.log("[DB]::Synced db.");
  })
  .catch((err: SequelizeScopeError) => {
    console.error("[DB]::Failed to sync db: " + err.message);
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
