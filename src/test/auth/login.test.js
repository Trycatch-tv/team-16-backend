import supertest from "supertest";
import app from "../../app.js";

const uri = "/auth/login";
const userLogin = {
    "email": "test@example.com",
    "password": "Hola1234#"
};

const validationsErrors = {
    "errors": [{
            "msg": "You must provide an email or a username.",
            "path": ""
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

describe("Login test", () => {
    test("Empty fields response in login endpoint", async() => {
        const response = await supertest(app).post(uri).send({});
        expect(response.statusCode).toBe(403);
        expect(response.body).toEqual(validationsErrors);
    });

    test("User login success", async() => {
        const response = await supertest(app).post(uri).send(userLogin);

        // Define un objeto parcial con las propiedades esperadas
        const respuestaEsperadaParcial = {
            id: expect.any(Number),
            name: 'Test',
            lastname: 'Admin',
            username: 'tadmin',
            email: 'test@example.com',
            roles: ['ROLE_USER'],
            accessToken: expect.any(String),
        };

        // Compara la respuesta con el objeto parcial
        expect(response.body).toMatchObject(respuestaEsperadaParcial);
    }, 35000);

    test("User login failed", async() => {
        userLogin.password = "Mypassword2#";
        const response = await supertest(app)
            .post(uri)
            .send(userLogin);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ message: "Invalid username or password please try again" });
    });
});