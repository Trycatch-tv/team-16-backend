import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Log = sequelize.define(
    "log", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        method: {
            type: DataTypes.STRING(6),
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        timestamps: true
    }
)

export default Log;