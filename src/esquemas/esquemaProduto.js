const joi = require("joi");
const gerarMensagens = require("../utils/gerarMensagemJoi");

const joiProduto = joi.object({
    descricao: joi.string().required().messages(
        gerarMensagens("descricao")
    ),

    quantidade_estoque: joi.number().integer().required().positive().messages(
        gerarMensagens("quantidade_estoque")
    ),

    valor: joi.number().integer().required().positive().messages(
        gerarMensagens("valor")
    ),

    categoria_id: joi.number().integer().required().positive().messages(
        gerarMensagens("categoria_id")
    ),

    produto_imagem: joi.any().optional(),
});

module.exports = joiProduto;