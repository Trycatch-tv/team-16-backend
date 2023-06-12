import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export let authUser = null;
export async function loginUser(email, password) {
  let token;
  const user = await Users.findOne({
    attributes: ["id", "public_id", "email", "password"],
    where: {
      email: email,
    },
  });

  if (user) {
    let compare = bcrypt.compareSync(password, user.password);
    if (!compare) {
      return {
        error: "Password incorrect",
      };
    }
    token = generateToken(user.dataValues);
    await Users.update(
      { token: token },
      {
        where: {
          id: user.id,
        },
      }
    );

    authUser = user

    return {
      id: user.public_id,
      token: token
    }

    // authUser = user
    // return await Users.findOne({
    //   attributes: ["public_id", "token"],
    //   where: {
    //     id: user.id,
    //   },
    // });
  }

  return {
    error: "Token failed",
  };
}
export async function registerUser(user) {
  user.password = await bcrypt.hash(user.password, 10);
  return new Promise((resolve, reject) => {
    Users.create(user)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function generateToken(user) {
  const token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: 60 * 10,
  });
  return token;
}

export async function logoutUser() {
  const dbResponse = new Promise((resolve, reject) => {
    Users.update(
      { token: null },
      {
        where: {
          id: authUser.id,
        },
      }
    )
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  authUser = null;
  return dbResponse;
}
