import { Router } from "express";
import { 
    createUser, 
    deleteUser, 
    getUserById, 
    getUsers, 
    updateUser 
} from "../controllers/users.controller.js";

const usersRoutes = Router();

usersRoutes.get("/", getUsers);
usersRoutes.post("/", createUser);
usersRoutes.get("/:id", getUserById);
usersRoutes.delete("/:id", deleteUser);
usersRoutes.put("/:id", updateUser);

export default usersRoutes;