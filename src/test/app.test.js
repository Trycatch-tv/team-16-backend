import supertest from "supertest";
import app from "../app.js";

describe("Test Routes", () => {
    test("running site /", async() => {
        const response = await supertest(app).get("/").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Welcome to api Zurmc." });
    });

    test("Error 404 redirect to App ", async() => {
        const response = await supertest(app).get("/api-incorrecto").send();
        expect(response.statusCode).toBe(404);
    });
});