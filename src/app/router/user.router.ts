import { Router } from "express";
import userController from "../controller/user.controller";
import userMiddleware from "../middleware/user.middleware";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.post("/", userMiddleware.createUser, userController.createUser);
router.post("/:id", userMiddleware.updateUser, userController.updateUser);
router.post("/toggleState/:id", userMiddleware.toggleActive, userController.toggleUser);

export default router;
