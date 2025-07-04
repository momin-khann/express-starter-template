import { green, red, yellow, blue, cyan, gray, bold } from "colorette";

const consoleLog = {
  // Success messages
  success: (message) => console.log(green(`✅ ${message}`)),

  // Error messages
  error: (message, details = "") => {
    console.error(red(`❌ ${message}`));
    if (details) console.error(red(details));
  },

  // Warning messages
  warn: (message) => console.warn(yellow(`⚠️  ${message}`)),

  // Info messages
  info: (message) => console.log(blue(`ℹ️  ${message}`)),

  // Debug messages
  debug: (message) => console.log(gray(`🔍 ${message}`)),

  // Server startup messages
  server: (port, env, apiPrefix) => {
    console.log(
      green(
        `🚀 Server is running on port ${cyan(port)} in ${bold(yellow(env))} mode`
      )
    );
    console.log(
      blue(`📡 API available at ${cyan(`http://localhost:${port}${apiPrefix}`)}`)
    );
  },

  // Database messages
  db: {
    connected: (dbName, host) =>
      console.log(
        bold(green(`✅ Connected to MongoDB: ${cyan(dbName)} at ${host}`))
      ),
    error: (error) =>
      console.error(bold(red("❌ Error connecting to MongoDB:")), red(error)),
  },
};

export { consoleLog };
