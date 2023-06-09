import * as usersServices from "../services/users.services.js";

export const getUsers = (request, response) => {
  return usersServices
    .getUsers()
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};

export const getUserById = (request, response) => {
  const { id } = request.params;
  usersServices
    .getUserById(id)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};
export const deleteUser = (request, response) => {
  const { id } = request.params;
  usersServices
    .deleteUser(id)
    .then(() => {
      response.status(200).json({
        message: "delete User successfully...",
      });
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};
export const updateUser = (request, response) => {
  const { id } = request.params;
  const user = request.body;
  usersServices
    .updateUser(id, user)
    .then(() => {
      response.status(200).json({
        data: user,
      });
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};
export const createUser = (request, response) => {
  const user = request.body;
  usersServices
    .createUser(user)
    .then((result) => {
      response.status(200).json({
        data: user,
      });
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};

export const loginUser = (request, response) => {
  const { email, password } = request.body;
  usersServices
    .loginUser(email, password)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};
