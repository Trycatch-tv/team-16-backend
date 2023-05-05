import { Router } from "express";
import {
  getCategorias,
  getCategoria,
  updateCategorias,
  deleteCategorias,
  createCategorias,
} from "../controllers/categorias.controller.js";

const categoriasRouter = Router();

categoriasRouter.get("/", getCategorias);
categoriasRouter.post("/", createCategorias);
categoriasRouter.get("/:id", getCategoria);
categoriasRouter.put("/:id", updateCategorias);
categoriasRouter.delete("/:id",deleteCategorias);

export default categoriasRouter;
