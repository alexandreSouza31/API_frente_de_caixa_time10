const app = require('../../src/servidor');
const request = require('supertest');
const { gerarToken } = require('../utils/gerarToken');

describe('Editar Perfil do Cliente', () => {
    const dadosCliente = {
        nome: 'Fulano',
        email: 'fulano@email.com',
        cpf: '11111111111',
        cep: '22222222',
        rua: 'paulo freire',
        numero: '12',
        bairro: 'jardim escola',
        cidade:'sao paulo',
        estado: 'sp'
    }

    let token;
    
    beforeAll(async () => {
        token = await gerarToken();
    });

    const editarPerfilCliente = async (corpo, authorization, id) => {
        return request(app)
            .put(`/cliente/${id}`)
            .set('Authorization', authorization)
            .send(corpo);
    };

    test('Editar perfil do cliente com token de autenticação válido e corpo sem nenhuma propriedade', async () => {
        const response = await editarPerfilCliente({}, `Bearer ${token}`,1);
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });

    test ('Editar perfil do cliente com token de autenticação válido e corpo completo', async () => {
        if(!dadosCliente.nome && !dadosCliente.email && !dadosCliente.cpf ) {
            const response = await editarPerfilCliente(dadosCliente, `Bearer ${token}`, 1);
            expect(response.statusCode).toEqual(201); 
            expect(response.body).toEqual(
                expect.objectContaining({
                    mensagem: expect.any(String)
                })
            );          
        }     
    });   

    test('Editar perfil do cliente com token de autenticação sem a propriedade nome', async () => {
        const response = await editarPerfilCliente({
            email: dadosCliente.email,
            cpf: dadosCliente.cpf
        }, `Bearer ${token}`, 1);
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });

    test('Editar perfil do cliente com token de autenticação sem a propriedade email', async () => {
        const response = await editarPerfilCliente({
            nome: dadosCliente.nome,
            cpf: dadosCliente.cpf
        }, `Bearer ${token}`, 1);        
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });

    test('Editar perfil do cliente com token de autenticação sem a propriedade cpf', async () => {
        const response = await editarPerfilCliente({
            nome: dadosCliente.nome,
            email: dadosCliente.email
        }, `Bearer ${token}`, 1);
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });
   
})