import sequelize from "../config/database.js";
import Role from '../models/role.model.js';
import User from '../models/user.model.js';
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Sequelize } from "sequelize";
import { sendMail } from '../mails/config.mails.js';
import { generateToken } from "../helpers/generateTokens.helpers.js";
import { genUsername } from "../helpers/generateUsers.helpers.js";
import moment from "moment-timezone";
import { config } from "dotenv";
import { logger } from "./log.services.js";
config();

const Op = sequelize.Sequelize.Op;
const secret = process.env.JWT_SECRET || "";
const front = process.env.HOST_FRONT_EMAIL;

export const registerUser = async(user, method, url) => {
    const { name, lastname, email, password, roles } = user;
    let username = await genUsername(name, lastname);
    let token_user = generateToken(60);
    let link = `${front}/auth/verify/${token_user}`;

    let fullName = `${name} ${lastname}`;
    let body = {
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
            password: bcrypt.hashSync(password, 8)
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
            if (user) sendMail(email, `${name}, please verify your email address`, 'confirm', body);
        }
        await logger(`User ${user.username} has created a new user`, method, url, user.id)
        return { statusCode: 201, message: "User was registered successfully! Please check your email to verify your account" };
    } catch (err) {
        return { statusCode: 500, message: err.message }
    }
}

export const loginUser = async(userBody) => {
    const { email, username, password } = userBody;

    try {
        const user = await User.findOne({
            where: Sequelize.literal(`email = '${email}' OR username = '${username}'`),
        });

        if (!user) {
            return { statusCode: 404, message: "User Not found." };
        }

        let passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return {
                statusCode: 400,
                message: "Invalid username or password please try again"
            };
        }

        if (user.email_verified_at === null) {
            return { statusCode: 401, message: "Email not verified, please check your email to activate the account" };
        }

        if (user.status === false) {
            return { statusCode: 401, message: "Account is not active, please contact with administrator of system" };
        }

        let authorities = [];
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        let token = Jwt.sign({ id: user.id, username: user.username, roles: authorities }, secret, { expiresIn: '12h' });

        return {
            statusCode: 200,
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        };
    } catch (err) {
        return { message: err.message }
    }
}

export const verifyUser = async(token) => {
    try {
        const user = await User.findOne({
            where: { token }
        });

        if (user.email_verified_at !== null) return { statusCode: 200, message: "Email already verified" };

        if (user) {
            try {
                let fechaActual = new Date();

                if (fechaActual <= user.caducidad_token) {
                    user.email_verified_at = new Date();
                    user.status = true;
                    user.token = null;
                    user.caducidad_token = null;
                    let userUpdate = await user.save();
                    if (userUpdate) {
                        if (userUpdate) account_data(user, `${user.name}, your account is already verified, these are your account details`)
                        return { statusCode: 200, message: "Email verified successfully!" };
                    } else {
                        return { statusCode: 400, message: "Could not verify account" };
                    }
                } else {
                    let token_user = generateToken(60);
                    let link = `${front}/auth/verify/${token_user}`;
                    let body = {
                        name: user.name,
                        link: link
                    };
                    let hoy = new Date();
                    user.token = token_user;
                    user.caducidad_token = hoy.setDate(hoy.getDate() + 1);
                    let userUpdate = await user.save();
                    if (userUpdate) {
                        sendMail(user.email, 'Re-Verify Email Address', 'reconfirm', body);
                        return { statusCode: 200, message: "An email was sent to you to confirm your account again because your grace time expired." };
                    } else {
                        return { statusCode: 400, message: "Could not send to re-verify account" };
                    }
                }
            } catch (error) {
                console.error('Failed to update user:', error);
                return { statusCode: 500, message: 'Failed to update user' };
            }
        } else {
            return { statusCode: 404, message: 'No user found with the entered token' };
        }
    } catch (error) {
        console.error('Failed to verify token:', error);
        return { statusCode: 500, message: 'Failed to verify token' };
    }
}

export const verifyNewUserSer = async(token) => {
    try {
        const user = await User.findOne({
            where: { token }
        });

        if (user.email_verified_at !== null) return { statusCode: 200, message: "Email already verified" };

        if (user) {
            try {
                let fechaActual = new Date();

                if (fechaActual <= user.caducidad_token) {
                    user.email_verified_at = new Date();
                    let token = generateToken(60);
                    let link = `${front}/auth/new-password/${token}`;
                    let bodyMail = {
                        name: `${user.name} ${user.lastname}`,
                        link: link,
                        year: new Date().getFullYear()
                    };
                    let horaActual = new Date();

                    user.token = token;
                    user.caducidad_token = horaActual.setMinutes(horaActual.getMinutes() + 60);


                    let userUpdate = await user.save();
                    if (userUpdate) {
                        if (process.env.NODE_ENV !== 'test') {
                            if (user) sendMail(user.email, `${user.name}, please generate a new password for your account`, 'new_password', bodyMail);
                        }
                        return { statusCode: 200, message: "Account verified successfully!" };
                    } else {
                        return { statusCode: 400, message: "Could not verify account" };
                    }
                } else {
                    let token_user = generateToken(60);
                    let link = `${front}/auth/verify/${token_user}`;
                    let body = {
                        name: user.name,
                        link: link
                    };
                    let hoy = new Date();
                    user.token = token_user;
                    user.caducidad_token = hoy.setDate(hoy.getDate() + 1);
                    let userUpdate = await user.save();
                    if (userUpdate) {
                        sendMail(user.email, 'Re-Verify Email Address', 'reconfirm', body);
                        return { statusCode: 200, message: "An email was sent to you to confirm your account again because your grace time expired." };
                    } else {
                        return { statusCode: 400, message: "Could not send to re-verify account" };
                    }
                }
            } catch (error) {
                console.error('Failed to update user:', error);
                return { statusCode: 500, message: 'Failed to update user' };
            }
        } else {
            return { statusCode: 404, message: 'No user found with the entered token' };
        }
    } catch (error) {
        console.error('Failed to verify token:', error);
        return { statusCode: 500, message: 'Failed to verify token' };
    }
}

export const verifyTokenUser = async(token) => {
    try {
        const user = await User.findOne({
            where: { token }
        });

        if (user === null) {
            return { statusCode: 400, message: 'The entered token is invalid or does not belong to any user' };
        } else {
            return { statusCode: 200, message: 'The token I entered is valid' };
        }

    } catch (error) {
        console.error('Failed to verify token:', error);
        return { statusCode: 500, message: 'Failed to verify token' };
    }
}

export const forgotPasswordUser = async(body) => {
    try {
        const { userBody } = body;
        const user = await User.findOne({
            where: Sequelize.literal(`email = '${userBody}' OR username = '${userBody}'`),
        });

        if (user.email_verified_at === null) {
            return { statusCode: 400, message: "Email not verified, please check your email to activate the account" };
        }

        if (user.status === false) {
            return { statusCode: 400, message: "Account is not active, please contact with administrator of system" };
        }

        if (user === null) {
            console.log(`No se encontro un usuario con ese token`.bgWhite.red);
            return { statusCode: 400, message: 'The entered token is invalid or does not belong to any user.' };
        } else {
            let token = generateToken(60);
            let link = `${front}/auth/recovery-password/${token}`;
            let bodyMail = {
                name: user.name,
                username: user.username,
                link: link,
                year: new Date().getFullYear()
            };
            let horaActual = new Date();

            user.token = token;
            user.caducidad_token = horaActual.setMinutes(horaActual.getMinutes() + 60);
            let userUpdate = await user.save();
            if (userUpdate) {
                sendMail(user.email, 'Reset Password', 'forgot', bodyMail);
                return { statusCode: 200, message: 'An email was sent to you to change your password account.' };
            }
        }
    } catch (error) {
        console.error('Failed to send email instructions:', error);
        return { statusCode: 500, message: 'Failed to send email instructions. Please contact with administrator of system.' };
    }
}

export const recoveryPasswordUser = async(params, body) => {
    try {
        const { token } = params;
        const { password } = body;
        const user = await User.findOne({
            where: { token }
        });
        if (user) {
            try {
                let fechaActual = new Date();

                if (fechaActual <= user.caducidad_token) {
                    user.password = bcrypt.hashSync(password, 8)
                    user.token = null;
                    user.caducidad_token = null;
                    let userUpdate = await user.save();
                    if (userUpdate) {
                        let bodyMail = {
                            name: `${user.name} ${user.lastname}`,
                            username: user.username,
                            link: `${front}/auth/login`,
                            year: new Date().getFullYear()
                        }
                        if (process.env.NODE_ENV !== 'test') {
                            if (userUpdate) sendMail(user.email, `${user.name}, you have successfully changed password for your account`, 'password_ok', bodyMail);
                        }
                        return { statusCode: 200, message: 'Password changed successfully' }
                    } else {
                        return { statusCode: 400, message: 'Couldn\'t changed password! 😣' };
                    }
                } else {
                    let token = generateToken(60);
                    let link = `${front}/auth/recovery-password/${token}`;
                    let body = {
                        name: user.name,
                        username: user.username,
                        link: link,
                        year: new Date().getFullYear()
                    };
                    let horaActual = new Date();

                    user.token = token;
                    user.caducidad_token = horaActual.setMinutes(horaActual.getMinutes() + 60);
                    let userUpdate = await user.save();
                    if (userUpdate) {
                        sendMail(user.email, 'Reset Password', 'forgot', body);
                        return { statusCode: 200, message: 'An email was sent to you to change your password account.' };
                    } else {
                        return { statusCode: 400, message: 'Couldn\'t send to re-forgot password' };
                    }
                }
            } catch (error) {
                console.error('Failed to update user:', error);
                return { statusCode: 500, message: 'Failed to update user' };
            }
        } else {
            return { statusCode: 400, message: 'The entered token is invalid or does not belong to any user.' };
        }
    } catch (error) {
        console.error('Failed to verify token:', error);
        return { statusCode: 500, message: 'Failed to verify token' };
    }
}

export const newPasswordUserSer = async(params, body) => {
    try {
        const { token } = params;
        const { password } = body;
        const user = await User.findOne({
            where: { token }
        });
        if (user) {
            try {
                let fechaActual = new Date();

                if (fechaActual <= user.caducidad_token) {
                    user.password = bcrypt.hashSync(password, 8)
                    user.token = null;
                    user.caducidad_token = null;
                    user.status = true;
                    let userUpdate = await user.save();
                    if (userUpdate) {
                        if (userUpdate) account_data(user, `${user.name}, these are your account details`)
                        return { statusCode: 200, message: 'Password created successfully for your account. Please check your email to login' }
                    } else {
                        return { statusCode: 400, message: 'Couldn\'t create password! 😣' };
                    }
                } else {
                    let token = generateToken(60);
                    let link = `${front}/auth/new-password/${token}`;
                    let bodyMail = {
                        name: user.name,
                        username: user.username,
                        link: link,
                        year: new Date().getFullYear()
                    };
                    let horaActual = new Date();

                    user.token = token;
                    user.caducidad_token = horaActual.setMinutes(horaActual.getMinutes() + 60);
                    let userUpdate = await user.save();
                    if (userUpdate) {
                        sendMail(user.email, 'Reset Password', 'new_password', bodyMail);
                        return { statusCode: 200, message: 'An email was sent to you to create your password account.' };
                    } else {
                        return { statusCode: 400, message: 'Couldn\'t send to re-create password' };
                    }
                }
            } catch (error) {
                console.error('Failed to update user:', error);
                return { statusCode: 500, message: 'Failed to update user' };
            }
        } else {
            return { statusCode: 400, message: 'The entered token is invalid or does not belong to any user.' };
        }
    } catch (error) {
        console.error('Failed to verify token:', error);
        return { statusCode: 500, message: 'Failed to verify token' };
    }
}

export const refreshTokenUser = async(body) => {
    try {
        const { oldToken } = body;
        const decoded = Jwt.verify(oldToken, secret);
        const userId = decoded.id;

        if (oldToken === null) {
            return { statusCode: 400, message: 'The token cannot be blank' };;
        }

        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return { statusCode: 404, message: 'User not found' };
        }

        let authorities = [];
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        let newToken = Jwt.sign({ id: user.id, username: user.username, roles: authorities }, secret, { expiresIn: '1d' });

        return { statusCode: 200, mesagge: 'A new token was generated', refresh_token: newToken };

    } catch (error) {
        console.error('Failed to renew token:', error);
        return { statusCode: 500, message: 'Failed to renew token' };
    }
}

export const reactiveUserSer = async(body) => {
    try {
        const { userBody } = body;
        const user = await User.findOne({
            where: Sequelize.literal(`email = '${userBody}' OR username = '${userBody}'`),
        });

        if (user.email_verified_at !== null) return { statusCode: 400, message: 'You have verified your account' }

        let token_user = generateToken(60);
        let link = `${front}/auth/verify/${token_user}`;
        let bodyMail = {
            name: user.name,
            link: link
        };
        let hoy = new Date();
        user.token = token_user;
        user.caducidad_token = hoy.setDate(hoy.getDate() + 1);
        let userUpdate = await user.save();
        if (userUpdate) {
            sendMail(user.email, 'Re-Verify Email Address', 'reconfirm', bodyMail);
            return { statusCode: 200, message: "An email was sent to you to confirm your account again because your grace time expired." };
        } else {
            return { statusCode: 400, message: "Couldn't send to re-verify email address');" }
        }
    } catch (error) {
        console.error('Failed to verify token:', error);
        return { statusCode: 500, message: 'Failed to re-activate user' };
    }
}

export const getRolesSer = async() => {
    try {
        const roles = await Role.findAll({
            order: [
                ["name", "ASC"]
            ]
        });
        return {
            statusCode: 200,
            roles
        }
    } catch (error) {
        console.error('Failed to get roles:', error);
        return { statusCode: 500, message: 'Failed to get roles' };
    }
}

export const gestionarRolesDeUsuarioSer = async(body) => {
    try {
        const { userID, roles } = body;
        let arrayRoles = [];
        let arrayRolesQ = [];

        const usuario = await User.findByPk(userID);
        if (!usuario) {
            return { statusCode: 404, message: 'User not found' };
        }

        const rolesActuales = await usuario.getRoles();

        const rolesAgregar = roles.filter(role => !rolesActuales.some(rolActual => rolActual.name === role));
        const rolesQuitar = rolesActuales.filter(rolActual => !roles.includes(rolActual.name));

        rolesActuales.forEach(rol => {
            arrayRoles.push(rol);
        })
        rolesQuitar.forEach(rol => {
            if (rol.name === 'user') return;
            arrayRolesQ.push(rol);
        });

        if (rolesAgregar.length > 0) {
            const rolesAAgregar = await Role.findAll({ where: { name: rolesAgregar } });
            rolesAAgregar.forEach(role => arrayRoles.push(role))
            await usuario.setRoles(arrayRoles);
            console.log(`Roles were added to the user ${usuario.username}`);
            return { statusCode: 200, message: `Roles were added to the user ${usuario.username}` }
        } else {
            if (arrayRolesQ.length > 0) {
                await usuario.removeRoles(arrayRolesQ);
                console.log(`User roles were removed ${usuario.username}`);
                return { statusCode: 200, message: `User roles were removed for this account: ${usuario.username}` }
            } else {
                return { statusCode: 403, message: 'It is not allowed to delete the user role' };
            }
        }

    } catch (error) {
        console.error('Failed to update user roles:', error);
        return { statusCode: 500, message: 'Failed to updates user roles' };
    }
}

const account_data = (user, subject) => {
    let link = `${front}/auth/login`;
    let bodyMail = {
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        link: link,
        year: new Date().getFullYear()
    }
    if (process.env.NODE_ENV !== 'test') {
        sendMail(user.email, subject, 'account_data', bodyMail);
    }
}