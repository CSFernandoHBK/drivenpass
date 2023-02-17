import { Router } from "express";
import { signIn, signUp } from "../controllers/user-controller";

const userRouter = Router();

userRouter
    .post("/sign-in", signIn)
    .post("/sign-up", signUp)

export {userRouter}