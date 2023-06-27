import Users, { comparePassword, encriptPassword } from "../models/Users.js";
import jwt from "jsonwebtoken";
import { getUserByEmailAndPassword, saveTokentoUser } from "./users.services.js";
import util from "../config/util.js";

export const getTokenToUser = (email, password) => {

}

export const getUserByEmail = async (email) => {
    const emailToSearch = email;
    try {
        return await Users.findAll({
            attributes: ["id", "name", "lastname", "email", "password", "public_id"],
            where: {
                email: emailToSearch
            },
            raw: true
        });
    } catch (err) {
        throw new Error(err);
    }
};

export const signin = async (email, password) => {
    let message, token;
    const passwd = password;
    const getUser = await getUserByEmail(email);
    if (!getUser.length) {
        message = "user not registred"
    } else {
        message = "user registred"
        try {
            const newId = getUser[0].id;
            const newEmail = getUser[0].email;
            const newPassword = getUser[0].password;
            const isPasswordEqual = await comparePassword(passwd, newPassword);
            if (!isPasswordEqual) {
                message = "password not match"
            } else {
                message = "password match"
                const newToken = jwt.sign(
                    {
                        id: newId,
                        email: newEmail,
                        password: newPassword
                    },
                    util.SECRET,
                    { expiresIn: 86400 });
                if (!newToken) {
                    console.log("no token available");
                } else {
                    token = newToken;
                    saveTokentoUser(newId, newToken);
                }
                console.log(newToken);
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    return new Promise((resolve, reject) => {
        resolve({
            message,
            token
        })
    });
};



export const signup = async (user) => {
    const { name, lastname, email, password } = user;
    const hash = await encriptPassword(password);

    return new Promise(
        (resolve, reject) => {
            Users.create({
                name,
                lastname,
                email,
                password: hash
            }, {
                raw: true
            }).then(
                async (data) => {
                    const { id, name, email, password } = data.toJSON();
                    resolve(
                        {
                            message: "User signup",
                        });
                }
            ).catch(
                err => {
                    console.error(err);
                    reject({ message: "User not created" });
                }
            );

        });

};