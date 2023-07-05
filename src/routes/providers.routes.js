import { Router } from "express";
import { isTokenValid, isAdmin } from "../middlewares/authJwt.js";
import { create, getAll, getAllDeleted, getById, remove, restore, update } from "../controllers/provider.controller.js";


const router = Router();

router.get('/providers', isTokenValid, getAll);
router.get('/providers/trashed', isTokenValid, getAllDeleted);
router.get('/provider/:id', isTokenValid, getById);
router.post('/provider', isTokenValid, create);
router.put('/provider/:id', isTokenValid, update);
router.delete('/provider/:id', isTokenValid, remove);
router.post('/provider/:id/restore', isTokenValid, restore)



export default router;