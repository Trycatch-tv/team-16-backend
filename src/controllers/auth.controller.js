import Users from "../models/Users.js";

export async function login(request, response) {
  const { email, password } = request.body;
  if (!password && !email) {
    return response.json({msg: "Empty fields"})
  }
  const user = await Users.findAll({
    where: {
      email: email,
      password: password
    }
  })

  if (user.length === 1) {
    return response.json({msg: "User logged"})
  }
  return response.json({error: "Email or password incorrects"})
}
