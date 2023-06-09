import supertest from "supertest";
import app from "../app";

const uri = "/api";
describe("Test Routes", () => {
  test("running site /api", async () => {
    const response = await supertest(app).get("/api").send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ app: "inventario" });
  });

  it('User login success', async () => {
    const response = await supertest(app).post(`${uri}/auth/login`).send({
      email: 'johndoe@example.com',
      password: 'mypassword'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({msg: "User logged"})
    
  }, 50000)

  test("Empty fields response in auth route", async () => {
    const response = await supertest(app).post(`${uri}/auth/login`).send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ msg: "Empty fields"})
  })

  //
  // test("User login success", async () => {
  //   const response = await supertest(app).post(`${uri}/auth/login`).send({
  //     email: 'johndoe@example.com',
  //     password: 'mypassword'
  //   });
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toEqual({msg: "User logged"})
  // })

  test("Error 404 redirect to App ", async () => {
    const response = await supertest(app).get("/api-incorrecto").send();
    expect(response.statusCode).toBe(404);
  });
});
