import { Router } from "express";
import {
    getCategoryById,
    getCategories,
    updateCategory,
    deleteCategory,
    createCategory,
  } from "../controllers/categories.controller.js";

const categoriesRoutes = Router();

categoriesRoutes.get("/", getCategories);
categoriesRoutes.post("/", createCategory);
categoriesRoutes.get("/:id", getCategoryById);
categoriesRoutes.put("/:id", updateCategory);
categoriesRoutes.delete("/:id",deleteCategory);

export default categoriesRoutes;