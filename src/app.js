import express from "express";
import indexRoutes from "./routes/index.route.js";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.set("port", process.env.PORT);
app.use("/api", indexRoutes);

export default app;
