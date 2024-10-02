import express from "express";
import { UserControllers } from "../controllers/user-controller.js";

export const userRouter = express.Router();

userRouter.get('/login', UserControllers.login);
userRouter.post('/register', UserControllers.register);