import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Provider = sequelize.define(
    "provider", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
)

export default Provider