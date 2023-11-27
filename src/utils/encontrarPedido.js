const knex = require("../bancoDeDados/conexao");

const encontrarPedidoPorIdCliente = async (cliente_id) => {
    try {
        const pedidoEncontrado = await knex("pedidos")
            .where("cliente_id", cliente_id);
        
        return pedidoEncontrado;
    } catch (error) {
        return error;
    }
}

module.exports = encontrarPedidoPorIdCliente;