import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StatusCodes } from "http-status-codes";
import {
  extractAccessToken,
  extractRefreshToken,
  verifyPassword,
} from "../utils/helper.js";
import logger from "../loggers/winston.logger.js";
import {
  generateAccessAndRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { nodeEnv } from "../config/globalConst.js";
import envManager from "../config/envManager.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select(
    "-password -refreshToken -isDeleted"
  );

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  const isValidPassword = await verifyPassword(user?.password, password);

  if (!isValidPassword) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  // generate access and refresh token & also set into cookies
  generateAccessAndRefreshToken(user._id, res);
  new ApiResponse(StatusCodes.OK, user, "login successful").send(res);
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  if (!user) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "error creating user");
  }

  logger.info("user registered", { user });

  new ApiResponse(StatusCodes.CREATED, "user registered successful").send(res);
};

export const getCurrentUser = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "No UserId Provided");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No User Found");
  }

  new ApiResponse(StatusCodes.OK, user, "User retrieved successfully");
};

export const logout = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User not found");
  }

  const user = await User.findById(userId);
  user.refreshToken = "";
  await user.save();

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  new ApiResponse(StatusCodes.OK, user, "logout successful").send(res);
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = extractRefreshToken(req);

  if (!refreshToken) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Unauthorized Request");
  }

  const decodedToken = verifyRefreshToken(refreshToken);

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (refreshToken !== user?.refreshToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh token expired or used");
  }

  generateAccessToken(user?._id, res);
  new ApiResponse(StatusCodes.OK, "Access Token Refreshed").send(res);
};
