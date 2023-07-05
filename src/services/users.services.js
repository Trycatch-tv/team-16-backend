import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";
import Role from '../models/role.model.js';
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import cloudinary from '../config/cloudinary.js';
import * as fs from 'fs';
import path from "path";
import { sendMail } from '../mails/config.mails.js';
import { generateToken } from "../helpers/generateTokens.helpers.js";
import { genUsername } from "../helpers/generateUsers.helpers.js";
import { generarContrasena } from "../helpers/generatePasswordFake.helpers.js";
import { checkFolderCreate, deleteImageStorage } from "../helpers/image.helpers.js";


const Op = sequelize.Sequelize.Op;
const front = process.env.HOST_FRONT_EMAIL;
export const getProfileSer = async(userId) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) return { statusCode: 404, message: 'User not found' };

        let authorities = [];

        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        return {
            statusCode: 200,
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            status: user.status,
            roles: authorities
        }
    } catch (error) {
        console.error('Failed to get user: ', error);
        return { statusCode: 500, message: 'Failed to get user' };
    }

}

export const getAllUsersSer = async() => {
    try {
        const users = await User.findAll({
            paranoid: true,
            attributes: ['id', 'name', 'lastname', 'email', 'username', 'avatar', 'email_verified_at', 'status'],
            order: [
                ["id", "DESC"]
            ]
        });
        return {
            statusCode: 200,
            users
        }
    } catch (error) {
        console.error('Failed to get users: ', error);
        return { statusCode: 500, message: 'Failed to get users' };
    }
}

export const trashUserSer = async() => {
    try {
        const users = await User.findAll({
            paranoid: false,
            attributes: ['id', 'name', 'lastname', 'email', 'username', 'avatar', 'email_verified_at', 'status'],
            order: [
                ["id", "DESC"]
            ]
        });
        return {
            statusCode: 200,
            users
        }
    } catch (error) {
        console.error('Failed to get users: ', error);
        return { statusCode: 500, message: 'Failed to get users' };
    }
}

export const getByIdSer = async(params) => {
    try {
        const { id } = params;
        const user = await User.findAll({
            paranoid: false,
            where: {
                id
            },
            attributes: ['id', 'name', 'lastname', 'email', 'username', 'avatar', 'email_verified_at', 'status']
        });
        return {
            statusCode: 200,
            user
        }
    } catch (error) {
        console.error('Failed to get users: ', error);
        return { statusCode: 500, message: 'Failed to get users' };
    }
}

export const changeStatusSer = async(params, body) => {
    try {
        const { id } = params;
        const { status } = body;
        const user = await User.findByPk(id);

        if (!user) return { statusCode: 404, message: 'User not found' };

        if (user) {
            const roles = await user.getRoles();
            let rolAdmin = false;
            roles.forEach(role => {
                if (role.name === 'admin') {
                    rolAdmin = true;
                }
            });

            if (rolAdmin) return { statusCode: 403, message: 'Unauthorized: Admins cannot modify status' };

            user.status = status;
            await user.save();
            return {
                statusCode: 200,
                message: 'Status changed successfully'
            };

        }


    } catch (error) {
        console.error('Failed to change status: ', error);
        return { statusCode: 500, message: 'Failed to change status' };
    }
}

export const userUpdateByUserSer = async(userId, body, file) => {
    try {
        const { name, lastname, email, password } = body;
        const { avatar } = file;

        const user = await User.findByPk(userId);
        if (!user) return { statusCode: 404, message: 'User not found' };

        if (user.public_id !== null) {
            await cloudinary.uploader.destroy(user.public_id);
        }

        const img_path = avatar.path;
        let name_img = img_path.split("\\");
        let portada_name = name_img[2];
        let fileName = id + '-' + ~~(Math.random() * 9999) + '-' + user.username.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        let splitName = name_img[2].split('.');
        let ext = splitName[1];

        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png' && ext !== 'webp' && ext !== 'avif' && ext !== 'gif' && ext !== 'bmp' && ext !== 'svg') {
            await logger(`Files not supported by the server. You are sending a file with this extension: ${ext}`, method, originalUrl, userId);
            deleteImageStorage('users', portada_name);
            return {
                statusCode: 400,
                message: `Files not supported by the server. The files must be in the format: BMP, GIF, JPG, JPEG, PNG, SVG, WEBP, AVIF. You are sending a file with this extension: ${ext.toUpperCase()}`
            };
        }

        const uploadImg = await cloudinary.uploader.upload(img_path, {
            upload_preset: 'trycatch',
            resource_type: "auto",
            folder: 'trycatch/users',
            public_id: `${fileName}`,
        });

        deleteImageStorage('users', portada_name);

        if (password === null) {
            password = user.password
        } else {
            password = bcrypt.hashSync(password, 8);
        }

        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.password = password
        user.avatar = uploadImg.secure_url;
        user.public_id = uploadImg.public_id;
        user.status = user.status;
        await user.save();
        return {
            statusCode: 200,
            message: 'User updated successfully'
        };
    } catch (error) {
        console.error('Failed to update user: ', error);
        return { statusCode: 500, message: 'Failed to update user' };
    }
}

export const userUpdateSer = async(userId, body) => {
    try {
        const { name, lastname, email, password, status } = body;

        const user = await User.findByPk(userId);
        if (!user) return { statusCode: 404, message: 'User not found' };

        if (password === null) {
            password = user.password
        } else {
            password = bcrypt.hashSync(password, 8);
        }

        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.password = password
        user.avatar = user.avatar;
        user.public_id = user.public_id;
        user.status = status;
        await user.save();
        return {
            statusCode: 200,
            message: 'User updated successfully'
        };
    } catch (error) {
        console.error('Failed to update user: ', error);
        return { statusCode: 500, message: 'Failed to update user' };
    }
}

export const userRemoveSer = async(userId, params) => {
    try {
        const { id } = params;
        if (userId == id) return { statusCode: 400, message: 'Don\'t have permission to remove your user' }
        const user = await User.findByPk(id, { paranoid: true });
        if (!user) return { statusCode: 404, message: 'User not found' };
        await user.destroy();
        return { statusCode: 200, message: 'User deleted successfully' };
    } catch (error) {

        console.error('Failed to remove user: ', error);
        return { statusCode: 500, message: 'Failed to remove user' };
    }
}

export const userRestoreSer = async(userId, params) => {
    try {
        const { id } = params;
        if (userId == id) return { statusCode: 400, message: 'Don\'t have permission to restore your user' }
        const user = await User.findByPk(id, { paranoid: false });
        if (!user) return { statusCode: 404, message: 'User not found' };
        await user.restore();
        return { statusCode: 200, message: 'User restored successfully' };
    } catch (error) {
        console.error('Failed to restore user: ', error);
        return { statusCode: 500, message: 'Failed to restore user' };
    }
}

export const userCreateSer = async(body) => {
    const { name, lastname, email, roles } = body;
    let username = await genUsername(name, lastname);
    let token_user = generateToken(60);
    let link = `${front}/auth/new_account/verify/${token_user}`;

    let fullName = `${name} ${lastname}`;
    let bodyMail = {
        name: fullName,
        link: link
    };

    try {
        let hoy = new Date();
        const user = await User.create({
            name: name,
            lastname: lastname,
            username: username,
            email: email,
            token: token_user,
            status: false,
            caducidad_token: hoy.setDate(hoy.getDate() + 1),
            password: bcrypt.hashSync(generarContrasena(), 8)
        });

        let userRoles = [];
        if (roles) {
            userRoles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: roles
                    }
                }
            });
        } else {
            // user role = 1
            const role = await Role.findByPk(1);
            userRoles.push(role);
        }

        await user.setRoles(userRoles);

        if (process.env.NODE_ENV !== 'test') {
            if (user) sendMail(email, `${name}, please verify your email address`, 'confirm_na', bodyMail);
        }

        return { statusCode: 201, message: "The user was created successfully! The registered email account will receive instructions to validate your account and then create your password." };
    } catch (err) {
        return { statusCode: 500, message: err.message }
    }
}