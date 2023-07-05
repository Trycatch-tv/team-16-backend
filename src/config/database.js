import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

let sequelize = new Sequelize(process.env.DB_URI, {
    dialect: process.env.DB_DIALECT,
    logging: false
});


if (process.env.NODE_ENV === 'test') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './dbtest.sqlite',
        logging: false
    })

}

export default sequelize;