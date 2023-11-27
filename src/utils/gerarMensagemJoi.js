const gerarMensagens = (campo, tipo) => ({
    "any.required": `O campo ${campo} é obrigatório!`,
    "string.empty": `O campo ${campo} é obrigatório!`,
    "number.integer": `O campo ${campo} deve ser um número inteiro!`,
    "number.positive": `O campo ${campo} deve ser um número positivo e maior que 0!`,
    "number.base": `O campo ${campo} deve ser um número inteiro!`,
    "string.base": `O campo ${campo} precisa ser uma string!`,
    ...(tipo && { "string.email": `O campo não apresenta um ${tipo} válido!` }),
});

module.exports = gerarMensagens;
