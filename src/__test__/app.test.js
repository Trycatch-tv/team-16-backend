import supertest from "supertest";
import app from "../App.js"
import sequelize from "../config/database.js";

describe("Test Application", () => {


    test("running site /api", async () => {
        const response = await supertest(app).get("/api");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({app:"inventario"});
    });
    test("Error 404 redirect to App ", async () => {
        const response = await supertest(app).get("/api-incorrecto");
        expect(response.statusCode).toBe(302);
    });



});



