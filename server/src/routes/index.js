import express from "express";
import { userRouter } from "./user-route.js";

export const router = express.Router();

router.use('/v1/api/auth', userRouter);
