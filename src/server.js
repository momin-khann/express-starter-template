import envManager from "./config/envManager.js";
import { connectMongoDB } from "./config/db.js";
import app from "./app.js";
import logger from "./loggers/winston.logger.js";
// import { seedInitialData } from "./config/seeder.js";
import { consoleLog } from "./loggers/console.logger.js";

const { portNumber, NODE_ENV, API_PREFIX } = envManager;

connectMongoDB().then(() => {
  // server only starts when db is connected
  app.listen(portNumber, () => {
    consoleLog.server(portNumber, NODE_ENV, API_PREFIX);
    logger.info("Server is running and also connected to DB.");

    // seed initial data
    // seedInitialData();
  });
});
