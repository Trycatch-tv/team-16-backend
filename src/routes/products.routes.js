import { Router } from "express";
import { isTokenValid, isAdmin } from "../middlewares/authJwt.js";
import { create, getAll, getAllDeleted, getById, remove, restore, update } from "../controllers/product.controller.js";
import { validateProduct } from "../validation/product.validation.js";
import multiparty from 'connect-multiparty';
import { checkFolderCreate } from "../helpers/image.helpers.js";
checkFolderCreate('products');
const path = multiparty({ uploadDir: './uploads/products' });

const router = Router();

router.get('/products', isTokenValid, getAll);
router.get('/products/trashed', isTokenValid, getAllDeleted);
router.get('/product/:id', isTokenValid, getById);
router.post('/product', [isTokenValid, path, validateProduct], create);
router.put('/product/:id', [isTokenValid, path, validateProduct], update);
router.delete('/product/:id', isTokenValid, remove);
router.post('/product/:id/restore', isTokenValid, restore)

export default router;