import express from "express";
import { validateData } from "./../middlewares/validate";
import { userLoginSchema } from "../schemas/user.schema";
import { asyncHandler } from "./../middlewares/asyncHanlder";
import { login } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", validateData(userLoginSchema), asyncHandler(login));

export { router as authRoutes };
