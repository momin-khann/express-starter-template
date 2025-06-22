import { StatusCodes } from "http-status-codes";
import envManager from "../config/envManager.js";
import logger from "../loggers/winston.logger.js";
import { nodeEnv } from "../config/globalConst.js";

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong";

  if (err.name === "JsonWebTokenError") {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = "Invalid token. Please log in again.";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = "Your token has expired. Please log in again.";
  }

  logger.error(message);

  res.status(statusCode).json({
    success: false,
    message,
    ...(envManager.NODE_ENV === nodeEnv.DEV && {
      stack: err?.stack,
      data: null,
    }),
  });
};

const notFoundHandler = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route not found",
  });
};

export { globalErrorHandler, notFoundHandler };
