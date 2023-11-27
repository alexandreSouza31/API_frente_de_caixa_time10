const joi = require('joi')
const gerarMensagens = require('../utils/gerarMensagemJoi')

const joiPedido = joi.object({   
   
    cliente_id: joi.number().integer().required().positive().messages(
        gerarMensagens("cliente_id")
    ),
  
    observacao: joi.allow(),
    pedido_produtos: joi.array().items(joi.object({
        produto_id: joi.number().integer().required().positive().messages(
            gerarMensagens("produto_id")
        ),
        quantidade_produto: joi.number().integer().required().positive().messages(
            gerarMensagens("quantidade_produto")
        ),
    })).min(1).required().messages({
        "any.required": "Não há nenhum item selecionado!",
        "array.min": "A lista precisa conter pelo menos 1 produto",
    }),
})

module.exports = {joiPedido}