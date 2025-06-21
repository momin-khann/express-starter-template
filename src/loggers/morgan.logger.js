import morgan from "morgan";
import logger from "./winston.logger.js";
import envManager from "../config/envManager.js";
import { nodeEnv } from "../config/globalConst.js";

export const stream = {
  // Use the http severity
  write: (message) => logger.http(message.trim()),
};

const morganMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  { stream, skip: envManager.NODE_ENV === nodeEnv.PROD }
);

export default morganMiddleware;
