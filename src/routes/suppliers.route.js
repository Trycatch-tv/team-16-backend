import { Router } from "express";
import {
    createSupplier,
    deleteSupplier,
    getSuppliers,
    getSuppliersById,
    updateSupplier
} from "../controllers/suppliers.controller.js";
import validateSupplier from "../validators/suppliers.validator.js";

const suppliersRoutes = Router();

suppliersRoutes.get("/", getSuppliers);
suppliersRoutes.get("/:id", getSuppliersById);
suppliersRoutes.delete("/:id", deleteSupplier);
suppliersRoutes.post("/", validateSupplier, createSupplier);
suppliersRoutes.put("/:id", validateSupplier, updateSupplier);

export default suppliersRoutes;