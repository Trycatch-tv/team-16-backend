import express from "express";
import indexRoutes from "./routes/index.route.js";
import dotenv from "dotenv";
import logger from "morgan";

dotenv.config();

const app = express();
app.use(logger("dev"));
app.use(express.json());

async function main() {
  app.set("port", process.env.PORT);
  app.use("/api", indexRoutes);
  app.listen(app.get("port"), () => {
    console.log("Server on port: ", app.get("port"));
  });
}

main();

export default app;
