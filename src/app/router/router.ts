import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import todoRouter from "./todo.router";

const router = Router();

router.use("/user", userRouter);
router.use("/signin", authRouter);
router.use("/todo", todoRouter);

export default router;
