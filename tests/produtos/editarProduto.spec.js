const app = require('../../src/servidor');
const request = require('supertest');
const { gerarToken } = require("../utils/gerarToken");

let token;
const idProduto = 1
const rotaEditarProduto = `/produto/${idProduto}`

beforeAll(async () => {
    token = await gerarToken();
});

describe('Editar Produto', () => {
    const corpoCompleto = {
        descricao: 'Salgadao',
        quantidade_estoque: 111,
        valor: 10,
        categoria_id: 6,
        produto_imagem: 'asd'
    };
    
    test("Editar produto com tipo incorreto no campo descricao", async () => {
        const response = await request(app).put(rotaEditarProduto).set('authorization', `Bearer ${token}`)
            .send({
                descricao: 41241,
                quantidade_estoque: 123,
                valor: 10,
                categoria_id: 11111,
                produto_imagem: 'asd'
            })
        expect(response.statusCode).toBe(400);
    });

    test("Editar produto com tipo incorreto no campo quantidade_estoque", async () => {
        const response = await request(app).put(rotaEditarProduto).set('authorization', `Bearer ${token}`)
            .send({
                descricao: 'Salgado',
                quantidade_estoque: 'asd',
                valor: 10,
                categoria_id: 11111,
                produto_imagem: 'asd'
            })
        expect(response.statusCode).toBe(400);
    });

    test("Editar produto com tipo incorreto no campo valor", async () => {
        const response = await request(app).put(rotaEditarProduto).set('authorization', `Bearer ${token}`)
            .send({
                descricao: 'Salgado',
                quantidade_estoque: 123,
                valor: 'asd',
                categoria_id: 11111,
                produto_imagem: 'asd'
            })
        expect(response.statusCode).toBe(400);
    });

    test("Editar produto com tipo incorreto no campo categoria_id", async () => {
        const response = await request(app).put(rotaEditarProduto).set('authorization', `Bearer ${token}`)
            .send({
                descricao: 'Salgado',
                quantidade_estoque: 123,
                valor: 10,
                categoria_id: 11111,
                produto_imagem: 'asd'
            })
        expect(response.statusCode).toBe(400);
    });

    test('Verificar com token inválido', async () => {
        const response = await request(app).get(rotaEditarProduto).set('authorization', `Bearer xxx.zxxx`)
            expect(response.statusCode).toBe(401)
            expect(response.body).toEqual({mensagem: 'Não autorizado'})
    })

    test('Verificar id enviado, mas não encontrado no banco de dados', async () => { 
        const response = await request(app).get(`/produto/${idProduto+9999}`).set('authorization', `Bearer ${token}`)
            expect(response.statusCode).toBe(404)
            expect(response.body).toEqual({mensagem: expect.any(String)})
    })    

})