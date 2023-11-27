const app = require("../../src/servidor");
const request = require("supertest");
const { gerarToken } = require("../utils/gerarToken");

describe("Listar Cliente", () => {
  let token;

  beforeAll(async () => {
    token = await gerarToken();
  });

  const listarClientes = async (authorization) => {
    return request(app).get(`/cliente`).set("Authorization", authorization);
  };

  test("Pedir lista de clientes com token de autenticação válido", async () => {
    const response = await listarClientes(`Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  test("Pedir lista de clientes com token de autenticação inválido", async () => {
    const response = await listarClientes(`Bearer xxx`);
    expect(response.statusCode).toBe(401);
  });
});
