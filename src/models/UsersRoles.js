import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Users from "./Users.js";
import Roles from "./Roles.js";

const UsersRoles = sequelize.define('usersroles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Users,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Roles,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}
);

export default UsersRoles;