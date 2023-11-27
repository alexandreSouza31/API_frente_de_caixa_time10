const knex = require("../bancoDeDados/conexao");

const encontrarClientePorId = async (cliente) => {
    try {
        const clienteEncontrado = await knex("clientes").where('id',cliente).first();
        return clienteEncontrado;
    } catch (error) {
        return error;
    }
}

module.exports = encontrarClientePorId;