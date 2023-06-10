import { createUser, loginUser } from "../services/users.services.js";

export async function login(request, response) {
  const { email, password } = request.body;
  loginUser(email, password)
    .then((data) => {
      data[0].token = "token test";
      response.json({
        msg: "User logged",
        data: data[0],
      });
    })
    .catch((error) => {
      return response.status(400).json({ error: error });
    });
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
  console.log(request.headers.authorization)
  return response.json({msg: "test"})
}
