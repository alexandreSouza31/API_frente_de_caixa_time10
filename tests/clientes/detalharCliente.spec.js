const app = require("../../src/servidor");
const request = require("supertest");
const { gerarToken } = require("../utils/gerarToken");
const {cadastrarCliente} = require("../utils/cadastrarCliente");

describe("Detalhar Cliente", () => {
  let token;
  let id;
  beforeAll(async () => {
    token = await gerarToken();
    id = await cadastrarCliente(token)
  });

  const detalharCliente = async (authorization, id) => {
    return request(app)
      .get(`/cliente/${id}`)
      .set("Authorization", authorization);
  };

  test("Pedir cliente corretamente com token de autenticação válido", async () => {
    const response = await detalharCliente(`Bearer ${token}`, id);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nome: expect.any(String),
        email: expect.any(String),
        cpf: expect.any(String),
      })
    );
  });

  test("Pedir cliente com id não númerado com token de autenticação válido", async () => {
    const response = await detalharCliente(`Bearer ${token}`, "teste");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });

  test("Pedir cliente com token de autenticação inválido", async () => {
    const response = await detalharCliente(`Bearer xxx`, 1);
    expect(response.statusCode).toBe(401);
  });
});
