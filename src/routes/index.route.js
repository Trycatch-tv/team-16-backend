
import { Router } from "express";
import productsRoutes from "./products.route.js";
import suppliersRoutes from "./suppliers.route.js";
import rolesRoutes from "./roles.route.js";
import usersRoutes from "./users.router.js";
import categoriesRoutes from "./categories.route.js";
import authRoutes from "./auth.route.js";
import usersRolesRouters from "./usersroles.route.js";

const indexRoutes = Router();
const prefix = "/api";

indexRoutes.get(prefix,(request,response)=>{
    response.json({app:"inventario"});
});

indexRoutes.use(`${prefix}/categories`,categoriesRoutes);
indexRoutes.use(`${prefix}/products`,productsRoutes);
indexRoutes.use(`${prefix}/suppliers`,suppliersRoutes);
indexRoutes.use(`${prefix}/roles`,rolesRoutes);
indexRoutes.use(`${prefix}/users`,usersRoutes);
indexRoutes.use(`${prefix}/auth`,authRoutes);
indexRoutes.use(`${prefix}/usersroles`,usersRolesRouters);

indexRoutes.use(`/*`,(request,response)=>{
    response.redirect(`/${prefix}`);
})

export default indexRoutes;