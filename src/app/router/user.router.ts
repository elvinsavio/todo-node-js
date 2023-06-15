import { Router } from "express";
import userController from "../controller/user.controller";
import userMiddleware from "../middleware/user.middleware";

const router = Router();

router.get("/", userMiddleware.createUser, userController.getAllUsers);

router.post("/", userMiddleware.createUser, userController.createUser);

export default router;
