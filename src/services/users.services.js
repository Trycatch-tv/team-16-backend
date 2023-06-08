import Users from "../models/Users.js";

export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    Users.create(user)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteUser = (id) => {
  const idUser = id;
  return new Promise((resolve, reject) => {
    Users.destroy({
      where: {
        id: idUser,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    Users.findByPk(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getUsers = () => {
  return new Promise((resolve, reject) => {
    Users.findAll()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const updateUser = (id, user) => {
  const idUser = id;
  return new Promise((resolve, reject) => {
    Users.update(user, {
      where: {
        id: idUser,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const loginUser = (email, password) => {
  const emailUser = email;
  const passwordUser = password;
  return new Promise((resolve, reject) => {
    Users.findAll({
      attributes: ["id", "public_id"],
      where: {
        email: emailUser,
        password: passwordUser,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
