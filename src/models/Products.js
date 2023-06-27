import sequelize from "../config/database.js";
import { DataTypes, Sequelize } from "sequelize";
import Users from "./Users.js";
import Categories from "./Categories.js";
import Suppliers from "./Suppliers.js";

const Products = sequelize.define('products',
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
        description: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        public_id: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: 'id'
            }
        },
        categories_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Categories,
                key: 'id'
            }
        },
        suppliers_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Suppliers,
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

export default Products;