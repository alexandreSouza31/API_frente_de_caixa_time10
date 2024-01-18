const verificarSenhaCorretaAdm = require("../utils/verificarSenhaCorretaAdm");

const verificarPermissaoAdmin = async (req, res, next) => {
    const { ehAdm } = req.usuario;

    if (req.usuario && (ehAdm && !verificarSenhaCorretaAdm(ehAdm))) {
        next();
    } else {
        return res.status(403).json({ mensagem: "Acesso negado. Você não é um ehAdministrador." });
    }
};


module.exports = { verificarPermissaoAdmin };