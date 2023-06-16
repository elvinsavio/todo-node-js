import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import authController from "../controller/auth.controller";

const router = Router();

/**
 * @description
 * sign in api
 */
router.post("/", authMiddleware.signin, authController.signin);

export default router;
