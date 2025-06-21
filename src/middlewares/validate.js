import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

export const validateData = (schema) => {
  return (req, _, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      const message = error.details?.[0]?.message || "Enter valid data!";
      throw new ApiError(StatusCodes.BAD_REQUEST, message);
    }
    req.body = value;
    next();
  };
};
