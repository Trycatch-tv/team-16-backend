import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/validate.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", validateToken, logout);

export default router;
