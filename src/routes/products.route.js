import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct
} from "../controllers/products.controller.js";
import upload from "../config/multer.js";
import { fileSizeLimitErrorHandler } from "../config/multer.js";

const productsRoutes = Router();

productsRoutes.get("/", getProducts);
productsRoutes.get("/:id", getProductById);
productsRoutes.delete("/:id", deleteProduct);
productsRoutes.post("/", upload.single('image'), fileSizeLimitErrorHandler, createProduct);
productsRoutes.put("/:id", upload.single('image'), fileSizeLimitErrorHandler, updateProduct);


export default productsRoutes;