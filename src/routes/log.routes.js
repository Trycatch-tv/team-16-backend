import { Router } from "express";
import { register_user, login_user, recovery_pass, forgotPasswordVal } from '../validation/user.validation.js';
import { isTokenValid, isAdmin } from "../middlewares/authJwt.js";
import { getAllLogsCont } from "../controllers/log.controller.js";

const router = Router();

router.get('/logs', [isTokenValid, isAdmin], getAllLogsCont);

export default router;