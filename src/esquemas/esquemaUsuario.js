const joi = require("joi");
const gerarMensagens = require("../utils/gerarMensagemJoi");

const joiUsuario = joi.object({
  nome: joi.string().required().messages(
    gerarMensagens("nome")
  ),

  email: joi.string().email().required().messages(
    gerarMensagens("email", "email")
  ),

  senha: joi.string().required().messages(
    gerarMensagens("senha")
  ),
  
  adm: joi.string().messages(
    gerarMensagens("adm")
    
  ),

});

module.exports = joiUsuario;
