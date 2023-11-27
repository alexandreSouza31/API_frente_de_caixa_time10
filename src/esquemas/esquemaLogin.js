const joi = require("joi");
const gerarMensagens = require("../utils/gerarMensagemJoi");

const joiLogin = joi.object({
  email: joi.string().email().required().messages(
    gerarMensagens("email","email")
  ),

  senha: joi.string().required().messages(
    gerarMensagens("senha")
  ),
});


module.exports = joiLogin;
