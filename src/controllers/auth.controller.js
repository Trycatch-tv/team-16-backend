import { createUser } from "../services/users.services.js";
import { loginUser, verifyToken } from "../services/auth.services.js";

export async function login(request, response) {
  const { email, password } = request.body;
  const user = await loginUser(email, password);
  if (user) {
    return response.json({
      msg: "User logged",
      data: user,
    });
  }
  return response.json({ error: "Login failed" }).status(400);
}

export async function register(request, response) {
  const user = request.body;
  createUser(user)
    .then(() => {
      response.status(200).json({
        msg: "User regist",
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

export async function logout(request, response) {
  if (request.headers["authorization"]) {
    const validate = await verifyToken(request.headers.authorization.split(" ")[1]);
    if (validate.iat) {
      return response.json({
        msg: "Logout success",
        data: {
          id: validate.public_id,
          iat: validate.iat, 
        },
      });
    }

    return response.json(validate).status(401);
  }

  return response.json({ error: "Unauthorized" }).status(401);
}
