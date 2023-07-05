import express from "express";
import indexRoutes from "./routes/index.routes.js";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import smtpTransport from "nodemailer-smtp-transport";

config();
const tz = process.env.TZ || 'America/Argentina/Cordoba';
const app = express();
const entorno = process.env.NODE_ENV || 'dev';
const url_front = process.env.HOST_FRONT || '*';

var corsOptions = {
    origin: url_front
};

app.use(cors(corsOptions));

app.use(morgan(entorno));
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.set("env", entorno);
app.set("port", process.env.API_PORT);
app.use(express.json());
app.set("port", process.env.API_PORT);
app.use("/", indexRoutes);

// Importamos los modelos
import './models/user.model.js';
import './models/role.model.js';
import './models/log.model.js';
import './models/provider.model.js';
import './models/category.model.js';
import './models/product.model.js';
import './models/userrole.model.js';
import './models/relations.model.js';

app.use((req, res, next) => {
    req.timezone = tz; // Establece la zona horaria deseada
    next();
});

export default app;