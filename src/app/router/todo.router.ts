import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import todoController from "../controller/todo.controller";
import todoMiddleware from "../middleware/todo.middleware";

const router = Router();

router.get("/", authMiddleware.verifyToken, todoController.getTodos);

router.post("/", authMiddleware.verifyToken, todoMiddleware.createTodo, todoController.createTodo);
router.post("/status/:id", authMiddleware.verifyToken, todoMiddleware.updateStatus, todoController.updateStatus);
router.post("/update/:id", authMiddleware.verifyToken, todoMiddleware.updateTodo, todoController.updateTodo);

export default router;
