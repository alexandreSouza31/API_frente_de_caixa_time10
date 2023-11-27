const app = require('../../src/servidor');
const request = require('supertest');
const { gerarToken } = require("../utils/gerarToken");

const rotaProdutoTeste = '/Produto';

let token;

beforeAll(async () => {
    token = await gerarToken();
});

describe('Cadastro de produtos', () => {
    const corpoCompleto = {
        descricao: 'Salgado',
        quantidade_estoque: 111,
        valor: 5,
        categoria_id: 4,
        produto_imagem: 'asd'
    };

    const cadastrarProduto = async (corpo, authorization) => {
        return request(app)
            .post(rotaProdutoTeste)
            .set('Authorization', authorization)
            .send(corpo);
    };

    test("Cadastrar produto com tipo incorreto no campo descricao", async () => {
        const response = await cadastrarProduto({
            descricao: 123,
            quantidade_estoque: 123,
            valor: 5,
            categoria_id: 4,
            produto_imagem: 'asd'
        }, `Bearer ${token}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: `O campo descricao precisa ser uma string!`
            })
        );
    });

    test("Cadastrar produto com tipo incorreto no campo quantidade_estoque", async () => {
        const response = await cadastrarProduto({
            descricao: 'Salgado',
            quantidade_estoque: 'asd',
            valor: 5,
            categoria_id: 4,
            produto_imagem: 'asd'
        }, `Bearer ${token}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });

    test("Cadastrar produto com tipo incorreto no campo valor", async () => {
        const response = await cadastrarProduto({
            descricao: 'Salgado',
            quantidade_estoque: 123,
            valor: 'One Piece',
            categoria_id: 4,
            produto_imagem: 'asd'
        }, `Bearer ${token}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });

    test("Cadastrar produto com tipo incorreto no campo categoria_id", async () => {
        const response = await cadastrarProduto({
            descricao: 'Salgado',
            quantidade_estoque: 123,
            valor: 10,
            categoria_id: 'Super',
            produto_imagem: 'asd'
        }, `Bearer ${token}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });

    test('Cadastrar produto informando token de autenticação válido e corpo sem nenhuma propriedade', async () => {
        const response = await cadastrarProduto({}, `Bearer ${token}`);
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });

    test('Cadastrar produto informando token de autenticação inválido e corpo sem nenhuma propriedade', async () => {
        const response = await cadastrarProduto({}, 'Bearer test');
        expect(response.statusCode).toEqual(401);
    });

    test('Cadastrar produto informando token de autenticação inválido e corpo completo', async () => {
        const response = await cadastrarProduto(corpoCompleto, 'Bearer xxx');
        expect(response.statusCode).toEqual(401);
    });
})