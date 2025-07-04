import mongoose from "mongoose";
import envManager from "../config/envManager.js";
import { consoleLog } from "../loggers/console.logger.js";

export const connectMongoDB = async () => {
  const { MONGODB_URL, DB_NAME } = envManager;

  try {
    const connectionInstance = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);

    consoleLog.db.connected(DB_NAME, connectionInstance.connection.host);
  } catch (error) {
    consoleLog.db.error("Error connecting to MongoDB, ", error);
    process.exit(1);
  }
};
