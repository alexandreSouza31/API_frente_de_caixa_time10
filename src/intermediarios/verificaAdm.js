const verificarPermissaoAdmin = async (req, res, next) => {
    const { adm } = req.usuario;

    if (req.usuario && (adm && adm !== process.env.EH_ADM)) {
        next();
    } else {
        return res.status(403).json({ mensagem: "Acesso negado. Você não é um administrador." });
    }
};


module.exports = {verificarPermissaoAdmin};