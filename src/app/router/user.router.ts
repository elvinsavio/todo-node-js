import { Router } from "express";
import userController from "../controller/user.controller";
import userMiddleware from "../middleware/user.middleware";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * @description
 * Get all users
 */
router.get("/", authMiddleware.verifyToken, userController.getAllUsers);

/**
 * @description
 * Get user by id
 */
router.get("/:id", authMiddleware.verifyToken, userController.getUserById);

/**
 * @description
 * Create user
 */
router.post("/", userMiddleware.createUser, userController.createUser);

/**
 * @description
 * Update user
 */
router.post("/update", authMiddleware.verifyToken, userMiddleware.updateUser, userController.updateUser);

/**
 * @description
 * Toggle user active
 */
router.post("/toggle-status/:id", authMiddleware.verifyToken, userMiddleware.toggleActive, userController.toggleUser);

export default router;
