
import { encriptPassword } from "../models/Users.js";
import Users from "../models/Users.js";

export const createUser = async (user) => {
    const { name, lastname, email, password, avatar, public_id, token, caducidad_token, status } = user;
    const hash = await encriptPassword(password);

    return new Promise(
        (resolve, reject) => {
            Users.create({
                name,
                lastname,
                email,
                password: hash,
                avatar,
                public_id,
                token,
                caducidad_token,
                status
            }
            )
                .then(data => {
                    let message;
                    if (data) {
                        message = "User created"
                    } else {
                        message = "User fail to create"
                    }
                    resolve({
                        message: message
                    });
                })
                .catch(err => { reject(err); });
        }
    );
};

export const deleteUser = (id) => {
    const idUser = id;
    return new Promise(
        (resolve, reject) => {
            Users.destroy(
                {
                    where: {
                        id: idUser
                    }
                }).then(
                    (data) => {
                        resolve(data);
                    }
                ).catch(err => {
                    reject(err);
                });
        }
    );
};

export const getUserById = (id) => {
    return new Promise(
        (resolve, reject) => {
            Users.findByPk(id).then(
                (data) => {
                    resolve(data);
                }
            ).catch(
                err => {
                    reject(err);
                }
            );
        }
    );
};
export const getUsers = () => {
    return new Promise(
        (resolve, reject) => {
            Users.findAll().
                then(
                    result => {
                        resolve(result)
                    }
                ).catch(
                    err => {
                        reject(err)
                    });
        }
    );
};
export const updateUser = (id, user) => {
    const idUser = id;
    return new Promise(
        (resolve, reject) => {
            Users.update(user, {
                where: {
                    id: idUser
                }
            })
                .then((data) => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err);
                });
        }
    );
};



export const getUserByEmailAndPassword = (email, password) => {
    const emailUser = email;
    const passwordUser = password;

    return new Promise(
        (resolve, reject) => {
            Users.findAll(
                {
                    attributes: ['id', 'name', 'lastname', 'email', 'password', 'token'],
                    where: {
                        email: emailUser,
                        password: passwordUser
                    }
                }
            ).then(
                data => {
                    resolve(data);
                }
            ).catch(
                err => {
                    reject(err);
                }
            );
        }
    );
};

export const saveTokentoUser = async (id, token) => {
    try {
        const saveToken = await Users.update({ token }, { where: { id } }, { raw: true });
    } catch (error) {
        throw new Error(error);
    }
};