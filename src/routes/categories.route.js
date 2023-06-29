import { Router } from "express";
import {
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../controllers/categories.controller.js";
import validateCategory from "../validators/categories.validator.js";

const categoriesRoutes = Router();

categoriesRoutes.get("/", getCategories);
categoriesRoutes.delete("/:id", deleteCategory);
categoriesRoutes.get("/:id", getCategoryById);
categoriesRoutes.post("/", validateCategory, createCategory);
categoriesRoutes.put("/:id", validateCategory, updateCategory);

export default categoriesRoutes;