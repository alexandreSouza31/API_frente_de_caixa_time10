const app = require("../../src/servidor");
const request = require("supertest");
const { gerarToken } = require("../utils/gerarToken");
const { cadastrarProduto } = require("../utils/cadastrarProduto");

describe("Excluir Produto ID", () => {
  let token;
  let id;
  beforeAll(async () => {
    token = await gerarToken();
    id = await cadastrarProduto(token);
  });

  const excluirProdutoId = async (authorization, id) => {
    return request(app)
      .delete(`/produto/${id}`)
      .set("Authorization", authorization);
  };

  test("Excluir produto existente", async () => {
    const response = await excluirProdutoId(`Bearer ${token}`, id);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  test("Excluir com parametro não numérico", async () => {
    const response = await excluirProdutoId(`Bearer ${token}`, "teste");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });

  test("Excluir produto não existente", async () => {
    const idNaoExistente = 99999999;
    const response = await excluirProdutoId(`Bearer ${token}`, idNaoExistente);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String),
      })
    );
  });
});
