import { Router } from "express";
import {
  getProductos,
  getProducto,
  createProductos,
  deleteProductos,
  updateProductos
} from "../controllers/productos.controller.js";

const productosRouter = Router();

productosRouter.get("/", getProductos);
productosRouter.get("/:id", getProducto);
productosRouter.post("/", createProductos);
productosRouter.delete("/:id",deleteProductos);
productosRouter.put("/:id",updateProductos);
export default productosRouter;