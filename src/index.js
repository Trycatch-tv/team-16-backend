import sequelize from "./config/database.js";
import app from "./app.js";

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");

    app.listen(app.get("port"), () => {
      console.log("Server on port: " + app.get("port"));
    });
  })
  .catch((error) => {
    console.log(error);
  });
