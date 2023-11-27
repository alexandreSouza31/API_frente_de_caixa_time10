const knex = require("../bancoDeDados/conexao");

const encontrarCategoriaPorId = async (categoria) => {
    try {
        const categoriaEncontrada = await knex("categorias").where('id',categoria).first();
        return categoriaEncontrada;
    } catch (error) {
        return error;
    }
}

module.exports = encontrarCategoriaPorId;