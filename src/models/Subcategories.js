import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import Categories from "./Categories.js";

const Subcategories = sequelize.define('subcategories',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        categories_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Categories,
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }

);

export default Subcategories;