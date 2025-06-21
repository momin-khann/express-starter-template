import "dotenv/config";

const {
  PORT,
  NODE_ENV,
  API_PREFIX,
  MONGODB_URL,
  DB_NAME,
  LOGS_DB_NAME,
  ALLOWED_ORIGINS,
  JWT_SECRET,
} = process.env;

const portNumber = PORT || 4001;

export default {
  portNumber,
  NODE_ENV,
  API_PREFIX,
  MONGODB_URL,
  DB_NAME,
  LOGS_DB_NAME,
  ALLOWED_ORIGINS,
  JWT_SECRET,
};
