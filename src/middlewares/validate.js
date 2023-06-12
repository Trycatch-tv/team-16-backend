import jwt from "jsonwebtoken";
import { authUser } from "../services/auth.services.js";

export function validateToken(request, response, next) {
  if (!authUser) {
    return response.status(401).json({ error: "User unauthenticated" });
  }
  if (!request.headers.authorization) {
    return response.status(401).json({ error: "Need a valid token" });
  }

  const validate = jwt.verify(
    request.headers.authorization.split(" ")[1],
    process.env.SECRET_KEY,
    function (err, decoded) {
      if (err) {
        return err;
      }
      return decoded;
    }
  );

  if (!validate.iat) {
    return response.status(401).json({ error: validate });
  }

  next();
}
