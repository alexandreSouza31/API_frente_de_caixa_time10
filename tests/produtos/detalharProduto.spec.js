const app = require('../../src/servidor')
const request = require('supertest')
const { gerarToken } = require('../utils/gerarToken');
const { cadastrarProduto } = require('../utils/cadastrarProduto');

let token; 
let id;
beforeAll(async () => {
    token = await gerarToken();
    id = await cadastrarProduto(token)
});


const rotaDetalharProduto = `/produto/${id}`
const rotaListarProdutos = '/produto'



describe('Detalhar Produto', () => {


    test('Verificar se enviado id no parâmetro de rota' , async () => {

        const response = await request(app).get(rotaDetalharProduto).set('authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
            expect.any(Object)
        )
    })

    test('Verificar se id não enviado no parâmetro de rota', async () => {            
        const response = await request(app).get(rotaListarProdutos).set('authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
            expect.any(Object)
        )
    })

    test('Verificar com token inválido', async () => {
        const response = await request(app).get(rotaDetalharProduto).set('authorization', `Bearer xxx.zxxx`)
            expect(response.statusCode).toBe(401)
            expect(response.body).toEqual({mensagem: 'Não autorizado'})
    })

    test('Verificar id enviado, mas não encontrado no banco de dados', async () => { 
        const response = await request(app).get(`/produto/${id+1}`).set('authorization', `Bearer ${token}`)
            expect(response.statusCode).toBe(404)
            expect(response.body).toEqual({mensagem: expect.any(String)})
    })    

})