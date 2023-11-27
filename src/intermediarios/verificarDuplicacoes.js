const knex = require("../bancoDeDados/conexao")

const validarEmailUsuario = async (email) => {
    try {
        const emailEncontrado = await knex("usuarios").where({ email }).first()        
        return emailEncontrado
    } catch (error) {
        return error
    }
}

const validarEmailCliente = async (email) => {
    try {
        const emailEncontrado = await knex("clientes").where({ email }).first()
        return emailEncontrado
    } catch (error) {
        return error
    }
}

const validarCpfCliente = async (cpf) => {
    try {
        const cpfEncontrado = await knex("clientes").where({ cpf }).first()
        return cpfEncontrado
    } catch (error) {
        return error
    }
}

const validarClienteIdEncontrado = async (id) => {
    try {
        const clienteIdEncontrado = await knex("clientes").where({ id }).first()
        return clienteIdEncontrado
    } catch (error) {
        return error
    }
}

module.exports = {
    validarEmailUsuario,
    validarEmailCliente,
    validarCpfCliente,
    validarClienteIdEncontrado
}