import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
    "user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        public_id: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        token: {
            type: DataTypes.STRING(60),
            allowNull: true
        },
        caducidad_token: {
            type: DataTypes.DATE,
            allowNull: true
        },
        email_verified_at: {
            type: DataTypes.DATE,
            allowNull: true
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

export default User;