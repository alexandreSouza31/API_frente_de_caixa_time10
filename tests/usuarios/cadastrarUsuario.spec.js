const app = require('../../src/servidor');
const request = require('supertest');

describe('Cadastro de usuarios', () => {
    const cadastroUsuario = {
        nome: 'Usuario Teste',
        email: 'teste@email.com',
        senha: '123456'
    }

    test('Cadastrar usuario sem a propriedade nome', async () => {
        const response = await request(app)
            .post('/usuario')
            .send({
                email: cadastroUsuario.email,
                senha: cadastroUsuario.senha
            })
        expect(response.statusCode).toBe(400);
    });

    test('Cadastrar usuario sem a propriedade email', async () => {
        const response = await request(app)
            .post('/usuario')
            .send({
                nome: cadastroUsuario.nome,
                senha: cadastroUsuario.senha
            })
        expect(response.statusCode).toBe(400);
    });

    test('Cadastrar usuario sem a propriedade senha', async () => {
        const response = await request(app)
            .post('/usuario')
            .send({
                nome: cadastroUsuario.nome,
                email: cadastroUsuario.email
            })
        expect(response.statusCode).toBe(400);
    });

    test('Cadastrar usuario com tipos incorretos nos campos', async () => {
        for (const prop in cadastroUsuario) {
            if (typeof cadastroUsuario[prop] !== 'string') {
                const response = await request(app)
                    .post('/usuario')
                    .send(cadastroUsuario)
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        mensagem: `O campo ${prop} precisa ser uma string!`
                    })
                );
            }
        }
    });

    test('Cadastrar usuario com todas a propriedades corretas', async () => {
        if (!cadastroUsuario.nome || !cadastroUsuario.email || !cadastroUsuario.senha) {
            const response = await request(app)
                .post('/usuario')
                .send(cadastroUsuario)
            expect(response.statusCode).toBe(201);
        }

    });

})