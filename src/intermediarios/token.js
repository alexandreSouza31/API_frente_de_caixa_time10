const jwt = require('jsonwebtoken')
const knex = require('../bancoDeDados/conexao')

const autenticadorUsuario = async (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({mensagem: 'Não autorizado'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {id} = jwt.verify(token, process.env.CHAVE_SECRETA)
        const usuario = await knex('usuarios').where({id}).first()

        if (!usuario) {
            return res.status(401).json({mensagem: 'Não autorizado'})
        }
    
        req.usuario = {id: usuario.id, nome: usuario.nome, email: usuario.email, ehAdm: usuario.ehAdm}
    
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({mensagem: 'Não autorizado'})
        }
        return res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
}

module.exports = autenticadorUsuario