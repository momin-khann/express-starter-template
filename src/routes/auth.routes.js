import express from "express";
import { validateData } from "./../middlewares/validate.js";
import { userLoginSchema } from "../schemas/user.schema.js";
import { asyncHandler } from "./../middlewares/asyncHanlder.js";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", validateData(userLoginSchema), asyncHandler(login));

export { router as authRoutes };
