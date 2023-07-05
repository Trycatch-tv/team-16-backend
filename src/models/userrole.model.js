import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

import User from './user.model.js';
import Role from './role.model.js';

const UserRole = sequelize.define('usersroles', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Role,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

export default UserRole;