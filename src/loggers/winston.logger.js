import winston from "winston";
import "winston-mongodb";
import envManager from "../config/envManager.js";
import { nodeEnv } from "../config/globalConst.js";

const isDevelopment = envManager.NODE_ENV === nodeEnv.DEV;
const isProduction = envManager.NODE_ENV === nodeEnv.PROD;

// Define your severity levels.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  return isDevelopment ? "debug" : "warn";
};

// link the colors according to the severity levels.
winston.addColors({
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "white",
});

// Log format only for console printing
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...extra } = info;
    // If there are extra fields, print JSON
    if (Object.keys(extra).length > 0) {
      return `[${timestamp}] ${level}: ${message} ${JSON.stringify(extra)}`;
    }
    return `[${timestamp}] ${level}: ${message}`;
  })
);

// Log format for File and DB storage
const fileAndDbFormat = winston.format.combine(
  winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss" }),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...extra } = info;
    // If there are extra fields, print JSON
    if (Object.keys(extra).length > 0) {
      return `[${timestamp}] ${level}: ${message} ${JSON.stringify(extra)}`;
    }
    return `[${timestamp}] ${level}: ${message}`;
  })
);

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console({ format: consoleFormat }),
  isProduction &&
    new winston.transports.MongoDB({
      db: `${envManager.MONGODB_URL}/${envManager.LOGS_DB_NAME}`,
      collection: "log_entries",
      level: "info",
      format: fileAndDbFormat,
    }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    format: fileAndDbFormat,
  }),
  new winston.transports.File({
    filename: "logs/info.log",
    level: "info",
    format: fileAndDbFormat,
  }),
  new winston.transports.File({
    filename: "logs/http.log",
    level: "http",
    format: fileAndDbFormat,
  }),
].filter(Boolean);

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
  level: level(),
  levels,
  transports,
});

export default logger;

/* 

  /// ! for mongodb 
  new winston.transports.MongoDB({
    db: `${envManager.MONGODB_URL}/social-logs`,
    collection: "log_entries",
    level: "info",
    format: fileAndDbFormat,
  }),


  /// ! for postgres
*/
