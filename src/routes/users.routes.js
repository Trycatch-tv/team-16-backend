import { Router } from "express";
import { isTokenValid, isAdmin } from "../middlewares/authJwt.js";
import { changeStatus, getAllTrashUsers, getAllUsers, getById, getProfile, userCreate, userDelete, userRestore, userUpdate, userUpdatebyUser } from "../controllers/users.controller.js";
import { checkFolderCreate } from "../helpers/image.helpers.js";
checkFolderCreate('users');
import multiparty from 'connect-multiparty';
const path = multiparty({ uploadDir: './uploads/users' });

const router = Router();

router.get("/users", [isTokenValid, isAdmin], getAllUsers)
router.get("/users/trashed", [isTokenValid, isAdmin], getAllTrashUsers)
router.get("/user/:id", [isTokenValid, isAdmin], getById)
router.post("/user/status/:id", [isTokenValid, isAdmin], changeStatus)
router.get("/me", isTokenValid, getProfile);
router.put("/profile/:id/edit", [isTokenValid, path], userUpdatebyUser)
router.put("/user/:id/edit", [isTokenValid, isAdmin, path], userUpdate)
router.post('/user/create', [isTokenValid, isAdmin], userCreate)
router.delete("/user/:id/delete", [isTokenValid, isAdmin], userDelete)
router.post("/user/:id/restore", [isTokenValid, isAdmin], userRestore)

export default router;