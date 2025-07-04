import express from "express";
import { validateData } from "./../middlewares/validate.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  getCurrentUser,
  login,
  refreshAccessToken,
  register,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", validateData(userLoginSchema), asyncHandler(login));
router.post("/register", validateData(userRegisterSchema), asyncHandler(register));
router.get("/current-user", verifyToken, asyncHandler(getCurrentUser));
router.post("/logout", verifyToken, asyncHandler(register));
router.post("/refresh-token", asyncHandler(refreshAccessToken));

// to be implemented
// /verify-email/:verificationToken
// /resend-email-verification
// /reset-password/:resetToken
// /forgot-password

export { router as authRoutes };
