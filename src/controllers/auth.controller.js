import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { verifyPassword } from "../utils/helper";

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
