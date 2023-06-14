import { user } from "../controller/index";

const router = require("express").Router();

router.get("/", user);

export default router;
