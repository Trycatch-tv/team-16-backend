import sequelize from "./config/database.js";
import app from "./app.js";
import colors from "colors";
import Role from "./models/role.model.js";
import { createUploadsFolder } from "./helpers/image.helpers.js";

// Verifica si el usuario ya fue creado previamente
// let userCreated = false;
const createRoleIfNotExists = async(roleName) => {
    const role = await Role.findOne({ where: { name: roleName } });

    if (!role) {
        // El rol no existe, se crea automáticamente
        await Role.create({ name: roleName });
        console.log(`Role '${roleName}' has been created successfully.`);
    } else {
        console.log(`Role '${roleName}' already exists.`);
    }
};


sequelize
    .sync({ alter: false })
    .then(() => {
        console.log(`The connection to the database has been established successfully`.bgGreen.white);
        createRoleIfNotExists("admin");
        createRoleIfNotExists("moderator");
        createRoleIfNotExists("user");
        createUploadsFolder();
        app.listen(app.get('port'), () => console.log(`The server is running on port: ${app.get('port')} without problems. In the environment of: ${app.get('env')}`.green));
    })
    .catch((error) => {
        console.log(error);
    });