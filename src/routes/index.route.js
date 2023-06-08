import { Router } from "express";
import productsRoutes from "./products.route.js";
import subcategoriesRoutes from "./subcategories.route.js";
import suppliersRoutes from "./suppliers.route.js";
import rolesRoutes from "./roles.route.js";
import usersRoutes from "./users.router.js";
import categoriesRoutes from "./categories.route.js";

const indexRoutes = Router();

indexRoutes.get("/", (_, response) => {
  response.json({ app: "inventario" });
});

indexRoutes.use("categories", categoriesRoutes);
indexRoutes.use("subcategories", subcategoriesRoutes);
indexRoutes.use("products", productsRoutes);
indexRoutes.use("suppliers", suppliersRoutes);
indexRoutes.use("roles", rolesRoutes);
indexRoutes.use("/users", usersRoutes);

export default indexRoutes;
