const knex = require("../bancoDeDados/conexao");
const encontrarUsuarioPorId = require("../utils/encontrarUsuarioPorId");


const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await knex("usuarios");
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

const excluirUsuarioPorId = async (req, res) => {
    let { usuarioId } = req.body;

    try {

        if (!Array.isArray(usuarioId)) {
            usuarioId = [usuarioId];
        }

        if (usuarioId) {
            
            const idASerExcluido = [];
            let usuarioExcluido;
            
            for (let id of usuarioId) {
                const usuario = await encontrarUsuarioPorId(id);

                if (!usuario) {
                    return res.status(404).json({ mensagem: `O usuário com id ${id} não existe!` });
                }
              
                usuarioExcluido = await knex("usuarios")
                    .where({ id })
                    .del()
                    .returning("*");
                
                if (usuarioExcluido.length > 0) {
                    idASerExcluido.push(usuarioExcluido[0])
                }
            }
            return res.status(200).json(idASerExcluido)
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    listarUsuarios,excluirUsuarioPorId
};
