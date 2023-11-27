const request = require('supertest');
const app = require('../../src/servidor');
const knex = require('../../src/bancoDeDados/conexao');

let token

const gerarToken = async () => {
    await knex('usuarios')
        .where('email', '=', 'jose.messias@cubos.academy')
        .del()
    await request(app).post('/usuario').send({
        nome: 'José Messias',
        email: 'jose.messias@cubos.academy',
        senha: 'jose'
    });
    const response = await request(app).post('/login').send({
        email: 'jose.messias@cubos.academy',
        senha: 'jose'
    });
    token = response.body.token;
    return response.body.token;
}

module.exports = {
    gerarToken,
    token
};