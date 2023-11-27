const request = require('supertest');
const app = require('../../src/servidor');

const cadastrarProduto = async (token) => {
    const produtoEncontrado = await request(app).post('/produto').set('authorization', `Bearer ${token}`).send({
        descricao : "Escova de Dentes",
        quantidade_estoque: 15,
        valor: 300,
        categoria_id: "3"
    })
    return produtoEncontrado.body[0].id
}

module.exports = {
    cadastrarProduto
};