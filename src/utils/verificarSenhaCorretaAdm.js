const verificarSenhaCorretaAdm = (adm) => {
    return adm === process.env.EH_ADM;
}

module.exports = verificarSenhaCorretaAdm;