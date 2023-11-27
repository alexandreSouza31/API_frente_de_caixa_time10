const request = require('supertest');
const app = require('../../src/servidor');

const cadastrarCliente = async (token) => {
    const clienteCadastrado = await request(app).post("/cliente").set('authorization', `Bearer ${token}`).send({
        email: "sormany@gmail.com",
        cpf: "00000000022",
        nome: "Jão paulo"
    })
    return clienteCadastrado.body[0].id
}

module.exports = {
    cadastrarCliente
};