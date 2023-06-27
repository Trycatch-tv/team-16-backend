
import { Sequelize } from "sequelize";

const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS || 'postgres';
const database = process.env.DB_NAME || 'inventario1';
const host = process.env.DB_HOST || 'localhost';
const portpg = process.env.DB_PORTPG || 5432;
const dialect = process.env.DB_DIALECT || 'postgres';
const entorno = process.env.NODE_ENV || 'dev';
const ssl = process.env.SSL || false;
const uri = process.env.DB_URI || `postgresql://${username}:${password}@${host}:${portpg}/${database}`;
let configDB = {} || '';


if (entorno === 'dev') {
    configDB = {
        database: database,
        username: username,
        password: password,
        portpg: portpg,
        dialect: dialect,
        host: host,
        ssl: ssl,
        logging: console.log
    }
}

if (entorno === 'prod') {
    configDB = uri;
}

let sequelize;
if (entorno === 'test') {
    sequelize = new Sequelize(database, username, password,
        { dialect: 'postgres' }
    );
}else{
    sequelize = new Sequelize(configDB);
}

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}


export default sequelize;