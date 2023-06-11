import Users from "../models/Users.js";
import jwt from "jsonwebtoken";

export async function loginUser(email, password) {
  const user = await Users.findOne({
    attributes: ["id", "public_id", "email", "token"],
    where: {
      email: email,
      password: password,
    },
  });

  if (user && user.dataValues.token === null) {
    const userUpdated = await Users.update(
      { token: generateToken(user.dataValues) },
      {
        where: {
          id: user.dataValues.id,
        },
      }
    );
    return await Users.findOne({
      attributes: ["public_id", "token"],
      where: {
        id: userUpdated,
      },
    });
  }

  return false;
}

function generateToken(user) {
  const token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: 60
  });
  return token;
}

export async function verifyToken(token) {
  const validate = jwt.verify(
    token,
    process.env.SECRET_KEY,
    function (err, decoded) {
      if (err) {
        return err;
      }
      return decoded;
    }
  );

  if (validate.iat) {
    await Users.update({ token: null}, {
      where: {
        id: validate.id
      }
    })
  }

  return validate;
}
