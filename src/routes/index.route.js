import { Router } from "express";
import categoriasRouter from "./categorias.route.js";
import productosRouter from "./productos.route.js";

const indexRouter = Router();
const prefix = "/api";

indexRouter.get(prefix,(req,res)=>{
    res.send("Welcome to Planescape api..");
});

indexRouter.use(`${prefix}/categorias`,categoriasRouter);
indexRouter.use(`${prefix}/productos`,productosRouter);

export default indexRouter;