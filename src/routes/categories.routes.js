import { Router } from "express";
import { isTokenValid, isAdmin } from "../middlewares/authJwt.js";
import { create, getAll, getAllDeleted, getById, remove, restore, update } from "../controllers/categories.controller.js";
import { validateCategory } from "../validation/category.validation.js";

const router = Router();

router.get('/categories', isTokenValid, getAll);
router.get('/categories/trashed', isTokenValid, getAllDeleted);
router.get('/category/:id', isTokenValid, getById);
router.post('/category', [isTokenValid, validateCategory], create);
router.put('/category/:id', [isTokenValid, validateCategory], update);
router.delete('/category/:id', isTokenValid, remove);
router.post('/category/:id/restore', isTokenValid, restore);

export default router;