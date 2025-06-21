import express from "express";
import cors from "cors";
import helmet from "helmet";
import { globalErrorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import corsOptions from "./config/cors.js";
import morganMiddleware from "./loggers/morgan.logger.js";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.routes.js";

const app = express();

// third party middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(morganMiddleware);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// custom middlewares

// Routes
app.use("/ping", (req, res) => res.status(200).json({ message: "hey there!" }));
app.use("/api/v1", authRoutes);

// router handler middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
