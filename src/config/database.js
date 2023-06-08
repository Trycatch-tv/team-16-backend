import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.DB_USER || "postgres";
const password = process.env.DB_PASS || "postgres";
const host = process.env.DB_HOST || "localhost";
const portpg = process.env.DB_PORTPG || 5432;
const dialect = process.env.DB_DIALECT || "postgres";
const entorno = process.env.NODE_ENV || "dev";
const ssl = process.env.SSL || false;
const uri = process.env.DB_URI;

let configDB;

if (entorno === "dev") {
  configDB = {
    username: username,
    password: password,
    portpg: portpg,
    dialect: dialect,
    host: host,
    ssl: ssl,
    logging: console.log,
  };
}

if (entorno === "prod") {
  configDB = uri;
}

const sequelize = new Sequelize(uri, {
  dialect: dialect,
});

export default sequelize;
