import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

const Users = sequelize.define('users',
    {
        "id": {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        "name": {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        "lastname": {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        "email": {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        "password": {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        "avatar": {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        "public_id": {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        "token": {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        "caducidad_token": {
            type: DataTypes.DATE,
            allowNull: true
        },
        "status": {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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



export const encriptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await new Promise(
        (resolve, reject) => {
            bcrypt.hash(password, salt)
                .then(hash => {
                    resolve(hash);
                })
                .catch(err => { reject(err) });
        }
    );
}

export const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}


export default Users;