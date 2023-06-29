import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct
} from "../controllers/products.controller.js";
import upload from "../config/multer.js";
import { validateImage } from "../config/multer.js";
import validateProduct from "../validators/products.validator.js";

const productsRoutes = Router();

productsRoutes.get("/", getProducts);
productsRoutes.get("/:id", getProductById);
productsRoutes.delete("/:id", deleteProduct);
productsRoutes.post("/", upload.single('image'), validateProduct, validateImage, createProduct);
productsRoutes.put("/:id", upload.single('image'), validateProduct, validateImage, updateProduct);


export default productsRoutes;