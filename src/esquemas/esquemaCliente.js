const joi = require("joi");
const gerarMensagens = require("../utils/gerarMensagemJoi");

const joiCadastrar = joi.object({
    email: joi.string().email().required().messages(
        gerarMensagens("email", "email")
    ),

    cpf: joi.string().required().messages(
        gerarMensagens("cpf")
    ),

    nome: joi.string().required().messages(
        gerarMensagens("nome")
    ),

    cep: joi.string().messages(
        gerarMensagens("cep")
    ),

    rua: joi.string().messages(
        gerarMensagens("rua")
    ),

    numero: joi.string().messages(
        gerarMensagens("numero")
    ),

    bairro: joi.string().messages(
        gerarMensagens("bairro")
    ),

    cidade: joi.string().messages(
        gerarMensagens("cidade")
    ),

    estado: joi.string().messages(
        gerarMensagens("estado")
    ),
});

module.exports = joiCadastrar;
