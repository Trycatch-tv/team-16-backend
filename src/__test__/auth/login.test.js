import supertest from "supertest";
import app from "../../app.js";

const uri = "/api/auth/login";
const userLogin = {
  email: "johndoe@example.com",
  password: "mypassword",
};

describe("Login test", () => {
  test("Empty fields response in auth route", async () => {
    const response = await supertest(app).post(uri).send();
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "Email or password empty" });
  });

  test("User login success", async () => {
    const response = await supertest(app)
      .post(uri)
      .send(userLogin);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ msg: "User logged" });
  }, 35000);

  test("User login failed", async () => {
    userLogin.password = "123";
    const response = await supertest(app)
      .post(uri)
      .send(userLogin);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });
});
