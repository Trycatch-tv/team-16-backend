import { Router } from "express";
import productsRoutes from "./products.routes.js";
import usersRoutes from "./users.routes.js";
import categoriesRoutes from "./categories.routes.js";
import authRoutes from "./auth.routes.js";
import logRoutes from "./log.routes.js";
import providerRoutes from "./providers.routes.js";

const indexRoutes = Router();

indexRoutes.get("/", (req, res) => {
    res.json({
        message: "Welcome to api Zurmc."
    });
});

indexRoutes.use("/api", categoriesRoutes);
indexRoutes.use("/api", productsRoutes);
indexRoutes.use("/api", usersRoutes);
indexRoutes.use("/api", logRoutes);
indexRoutes.use("/api", providerRoutes);
indexRoutes.use("/auth", authRoutes);

export default indexRoutes;