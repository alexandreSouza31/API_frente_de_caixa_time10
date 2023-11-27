const request = require("supertest");
const { validarEmailCliente, validarCpfCliente } = require("../../src/intermediarios/verificarDuplicacoes");
const app = require("../../src/servidor");
const { gerarToken } = require("../utils/gerarToken");

const rotaClienteTeste = '/cliente';

let token;

beforeAll(async () => {
    token = await gerarToken();
});

describe("Cadastro de clientes", () => {
    const corpoCompleto = {
        nome: 'Cliente Tal',
        email: 'cliente.teste@gmail.com',
        cpf: '11111111111',
    };

    const cadastrarCliente = async (corpo, authorization) => {
        return request(app)
            .post(rotaClienteTeste)
            .set('Authorization', authorization)
            .send(corpo);
    };

    test("Cadastrar cliente com tipos incorretos nos campos", async () => {

        for (const prop in corpoCompleto) {
            if (typeof corpoCompleto[prop] !== 'string') {
                const response = await cadastrarCliente(corpoCompleto, `Bearer ${token}`);
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        mensagem: `O campo ${prop} precisa ser uma string!`
                    })
                );
            }
        }
    });


    test('Cadastrar cliente informando token de autenticação válido e corpo sem nenhuma propriedade', async () => {
        const response = await cadastrarCliente({}, `Bearer ${token}`);
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        );
    });

    test('Cadastrar cliente informando token de autenticação inválido e corpo sem nenhuma propriedade', async () => {
        const response = await cadastrarCliente({}, 'Bearer xxx');
        expect(response.statusCode).toEqual(401);
    });

    test('Cadastrar cliente informando token de autenticação inválido e corpo completo', async () => {
        const response = await cadastrarCliente(corpoCompleto, 'Bearer xxx');
        expect(response.statusCode).toEqual(401);
    });

    test("Cadastrar cliente com email ou cpf já existentes", async () => {
        const emailClienteExiste = await validarEmailCliente("cliente.teste@gmail.com");
        const cpfClienteExiste = await validarCpfCliente("11111111111");
        const authorization = `Bearer ${token}`;

        if (emailClienteExiste && cpfClienteExiste) {
            response = await cadastrarCliente(corpoCompleto, authorization);
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    mensagem: "O e-mail e o cpf informados pertencem a outro(s) cliente(s)!"
                })
            );
        } else if (emailClienteExiste) {
            response = await cadastrarCliente(corpoCompleto, authorization);
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    mensagem: "O e-mail informado pertence a outro cliente!"
                })
            );
        } else if (cpfClienteExiste) {
            response = await cadastrarCliente(corpoCompleto, authorization);
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    mensagem: "O cpf informado pertence a outro cliente!"
                })
            );
        }
    });

    test("Cadastrar cliente corretamente", async () => {
        const emailClienteExiste = await validarEmailCliente("cliente.teste@gmail.com");
        const cpfClienteExiste = await validarCpfCliente("11111111111");
        const authorization = `Bearer ${token}`;

        if (!emailClienteExiste && !cpfClienteExiste) {
            response = await cadastrarCliente(corpoCompleto, authorization);
            expect(response.statusCode).toBe(201);
        }
    });
});
