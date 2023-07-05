import supertest from "supertest";
import app from "../../app.js";

const uri = "/auth/register";
const userRegister = {
    "name": "Test",
    "lastname": "User",
    "email": generateRandomEmail(),
    "password": "Mypassword2#"
};

const validationsErrors = {
    "errors": [{
            "msg": "The name field is required.",
            "path": "name"
        },
        {
            "msg": "The lastname field is required.",
            "path": "lastname"
        },
        {
            "msg": "The email field is required..",
            "path": "email"
        },
        {
            "msg": "The email field must be a valid email address.",
            "path": "email"
        },
        {
            "msg": "The password field is required.",
            "path": "password"
        },
        {
            "msg": "Password must be between 6 and 20 characters",
            "path": "password"
        },
        {
            "msg": "Password must contain at least one capital letter",
            "path": "password"
        },
        {
            "msg": "Password must contain at least one lowercase letter",
            "path": "password"
        },
        {
            "msg": "Password must contain at least one number",
            "path": "password"
        },
        {
            "msg": "Password must contain at least one symbol",
            "path": "password"
        }
    ]
}

describe("Register test", () => {
    test("Empty fields response in register endpoint", async() => {
        const response = await supertest(app).post(uri).send({
            "name": "",
            "lastname": "",
            "email": "",
            "password": ""
        });
        expect(response.statusCode).toBe(403);
        expect(response.body).toEqual(validationsErrors);
    });

    test("User register success", async() => {
        const response = await supertest(app).post(uri).send(userRegister);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ message: "User was registered successfully! Please check your email to verify your account" });
    }, 35000);

    test("Sending an email already registered in the database should give an error", async() => {
        const response = await supertest(app).post(uri).send({
            "name": "Test",
            "lastname": "User",
            "email": "testuser2@example.com",
            "password": "Mypassword2#"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            "message": "Failed! Email is already in use!"
        });
    });
});

function generateRandomEmail() {
    const staticPart = "user";
    const uniqueId = Math.floor(Math.random() * 10000);
    const email = `${staticPart}${uniqueId}@example.com`;
    return email;
}