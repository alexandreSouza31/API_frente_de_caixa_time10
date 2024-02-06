const knex = require("../bancoDeDados/conexao");

const encontrarUsuarioPorId = async (usuarioId) => {
    try {
        const usuarioEncontrado = await knex("usuarios").where('id', usuarioId).first();
        return usuarioEncontrado;
    } catch (error) {
        return error;
    }
}

module.exports = encontrarUsuarioPorId;