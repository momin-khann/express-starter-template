import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { User } from "../models/user.model.js";
import { extractAccessToken } from "../utils/helper.js";

export const verifyToken = async (req, res, next) => {
  const token = extractAccessToken(req);

  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "no token provided");
  }

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(404, "No user found");
  }

  req.userId = decoded._id;
  req.user = user;
  req.token = token;

  next();
};

export const validateSameUser = async (req, res, next) => {
  const { userId } = req.body;
};
