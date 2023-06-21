import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import todoController from "../controller/todo.controller";
import todoMiddleware from "../middleware/todo.middleware";

const router = Router();

router.get("/", authMiddleware.verifyToken, todoController.getTodos);

router.post("/", authMiddleware.verifyToken, todoMiddleware.createTodo, todoController.createTodo);
router.post("/update/:id", authMiddleware.verifyToken, todoMiddleware.updateTodo, todoController.updateTodo);

export default router;
