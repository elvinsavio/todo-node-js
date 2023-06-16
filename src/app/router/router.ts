import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";

const router = Router();

router.use("/user", userRouter);
router.use("/signin", authRouter);

export default router;
