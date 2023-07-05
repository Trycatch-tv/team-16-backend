import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Product = sequelize.define(
    'product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
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
            type: DataTypes.TEXT,
            allowNull: true
        },
        public_id: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        paranoid: true,
        timestamps: true
    }
);

export default Product;