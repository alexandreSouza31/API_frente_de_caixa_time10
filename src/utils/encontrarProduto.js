const knex = require("../bancoDeDados/conexao");

const encontrarProdutoPorId = async (id) => {
    try {
        const produtoEncontrado = await knex("produtos").where({id}).first();
        return produtoEncontrado;
    } catch (error) {
        return error;
    }
}

module.exports = encontrarProdutoPorId;