import express from "express";
import indexRoutes from "./routes/index.route.js";
import dotenv from "dotenv";
import logger from "morgan";
import sequelize from "./config/database.js";

dotenv.config();

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.set("port", process.env.PORT);
app.use("/api", indexRoutes);

// async function main() {
//   try {
//     await sequelize.sync();
//     app.listen(app.get("port"), () => {});
//   } catch (error) {
//     console.log(error)
//   }
// }
//
// main();

export default app;
