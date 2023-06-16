import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import authController from "../controller/auth.controller";

const router = Router();

router.post("/", authMiddleware.signin, authController.signin);

export default router;
