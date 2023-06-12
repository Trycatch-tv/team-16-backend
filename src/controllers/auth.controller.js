import {
  loginUser,
  registerUser,
  logoutUser,
  authUser,
} from "../services/auth.services.js";

export async function login(request, response) {
  if (!request.body.email || !request.body.password) {
    return response.status(400).json({ error: "Email or password empty" });
  }

  const { email, password } = request.body;
  const user = await loginUser(email, password);
  if (user.dataValues) {
    return response.status(200).json({
      msg: "User logged",
      data: user,
    });
  }
  return response.status(404).json({ error: user.error });
}

export async function register(request, response) {
  const user = request.body;
  await registerUser(user)
    .then(() => {
      response.status(200).json({
        msg: "Success",
        data: user,
      });
    })
    .catch((err) => {
      const errors = [];
      err.errors.forEach((element) => {
        errors.push(element.message);
      });
      response.status(500).send({ errors: errors });
    });
}

export async function logout(_, response) {
  const user = authUser;
  logoutUser()
    .then(() => {
      return response.status(200).json({
        msg: "Succes",
        data: {
          id: user.public_id,
          token: user.token,
        },
      });
    })
    .catch((err) => {
      return response.status(500).json({ error: err });
    });
}
