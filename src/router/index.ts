const router = require("express").Router();
import middleware from "../middleware";
import user from "./user";

router.use("/user", middleware, user);

export default router;
