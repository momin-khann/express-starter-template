import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StatusCodes } from "http-status-codes";
import { verifyPassword } from "../utils/helper.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = User.findOne({ email });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  const isValidPassword = await verifyPassword(user.password, password);

  if (!isValidPassword) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  new ApiResponse(StatusCodes.OK, user, "login successful").send(res);
};
