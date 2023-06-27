
import { Router } from "express";
import {
    getUserByEmail,
    signin,
    signup
}
    from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signin", signin);
authRoutes.post("/signup", signup);
authRoutes.post("/getUserByEmail", getUserByEmail);

export default authRoutes;