const app = require('../../src/servidor');
const request = require('supertest');


describe('Login do usário', () => {

    const dadosLogin = {
        email: 'jose.messias@cubos.academy',
        senha: 'jose'
    }

    test('Validar login com email não enviado', async () => {
        const response = await request(app).post('/login').send({
            email: '',
            senha: dadosLogin.senha
        })
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ mensagem: expect.any(String) })
    })

    test('Validar login com email inválido enviado', async () => {
        const response = await request(app).post('/login').send({
            email: 'a@a.com',
            senha: dadosLogin.senha
        })
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ mensagem: expect.any(String) })
    })

    test('Validar login com senha não enviada', async () => {
        const response = await request(app).post('/login').send({
            email: dadosLogin.email,
            senha: ''
        })
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ mensagem: expect.any(String) })
    })

    test('Validar login com senha inválida enviada', async () => {
        const response = await request(app).post('/login').send({
            email: dadosLogin.email,
            senha: '141415'
        })
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ mensagem: expect.any(String) })
    })

    test('Validar login com senha e email válidos e geração de token', async () => {
        if (!dadosLogin.email || !dadosLogin.senha) {
            const response = await request(app).post('/login').send({
                email: dadosLogin.email,
                senha: dadosLogin.senha
            })
            expect(response.statusCode).toBe(201)
            expect(response.body).toEqual({ token: expect.any(String) , usuario: expect.any(Object) })
        }

    })

})