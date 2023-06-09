import User from "../models/Users.js";

export async function login(request, response) {
  const { email, password } = request.body;
  if (!password || !email) {
    return response.status(400).json({ error: "Email or password empty" });
  }
  const user = await User.findAll({
    where: {
      email: email,
      password: password,
    },
  })

  if (user.length === 1) {
    return response.json({ msg: "User logged" });
  }
  return response.status(404).json({ error: "User not found" });
}
