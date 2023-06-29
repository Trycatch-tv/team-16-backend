import express from "express";
import indexRoutes from "./routes/index.route.js";
import sequelize from "./config/database.js"
import dotenv from "dotenv";
import logger from "morgan";
import "./config/relations.js"

const app = express();
dotenv.config();
app.use(logger("dev"));

async function main() {

    await sequelize.sync({ force: false }).then(result => {
        app.set("port", process.env.PORT);
        //middlewares
        app.use(express.json());
        app.use((err, request, response, next) => {
            if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
              response.status(400).json({ error: 'incomplete JSON' });
            } else {
              next();
            }
          });        
        app.use("/", indexRoutes)
        app.listen(app.get("port"), () => { });
    });

}

main();

export default app;