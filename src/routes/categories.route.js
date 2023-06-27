import { Router } from "express";
import {
    getCategoryById,
    getCategories,
    updateCategory,
    deleteCategory,
    createCategory,
  } from "../controllers/categories.controller.js";
import upload, { fileSizeLimitErrorHandler } from "../config/multer.js";

const categoriesRoutes = Router();

categoriesRoutes.get("/", getCategories);
categoriesRoutes.delete("/:id",deleteCategory);
categoriesRoutes.get("/:id", getCategoryById);
categoriesRoutes.post("/", upload.single('image'), fileSizeLimitErrorHandler,createCategory);
categoriesRoutes.put("/:id", upload.single('image'), fileSizeLimitErrorHandler,updateCategory);

export default categoriesRoutes;