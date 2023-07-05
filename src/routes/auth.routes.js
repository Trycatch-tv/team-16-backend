import { Router } from "express";
import { checkDuplicateEmail, checkRolesExisted } from "../middlewares/verifySignUp.js";
import { register_user, login_user, recovery_pass, forgotPasswordVal } from '../validation/user.validation.js';
import { isTokenValid, isAdmin } from "../middlewares/authJwt.js";
import { register, login, verify, verifyToken, forgotPassword, resetPassword, refreshToken, reactiveUser, getRoles, gestionarRoles, verifyNewUser, newPasswordUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", [
    checkDuplicateEmail,
    checkRolesExisted
], register_user, register);
router.post("/login", login_user, login);
router.post("/refresh", isTokenValid, refreshToken);
router.get('/verify/token/:token', verifyToken);
router.get('/new_account/verify/:token', verifyNewUser);
router.get('/verify/:token', verify);
router.post('/forgot-password', forgotPasswordVal, forgotPassword);
router.post('/recovery-password/:token', recovery_pass, resetPassword);
router.post('/new-password/:token', recovery_pass, newPasswordUser);
router.post('/re-activate', forgotPasswordVal, reactiveUser);
router.get('/roles', [isTokenValid, isAdmin], getRoles);
router.post('/roles', [isTokenValid, isAdmin], gestionarRoles);

export default router;