import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import UserRole from "../models/userrole.model.js";
import bcrypt from "bcryptjs";
const user = await User.create({
    name: "Test",
    "lastname": "Admin",
    "username": "tadmin",
    "email": "test@example.com",
    "password": bcrypt.hashSync('Hola1234#', 8),
    "email_verified_at": new Date()
})

UserRole.create({
    userId: user.id,
    roleId: 1
})