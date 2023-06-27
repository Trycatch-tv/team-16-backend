import { Router } from "express";
import {
    createSupplier,
    deleteSupplier,
    getSuppliers,
    getSuppliersById,
    updateSupplier
} from "../controllers/suppliers.controller.js";

const suppliersRoutes = Router();

suppliersRoutes.get("/", getSuppliers);
suppliersRoutes.get("/:id", getSuppliersById);
suppliersRoutes.delete("/:id",deleteSupplier);
suppliersRoutes.post("/",createSupplier);
suppliersRoutes.put("/:id",updateSupplier);

export default suppliersRoutes;