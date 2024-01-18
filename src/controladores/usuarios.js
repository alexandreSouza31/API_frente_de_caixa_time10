const knex = require("../bancoDeDados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validarEmailUsuario } = require("../intermediarios/verificarDuplicacoes");
const verificarSenhaCorretaAdm = require("../utils/verificarSenhaCorretaAdm");

const detalharPerfilUsuario = async (req, res) => {
  try {
    const resposta = req.usuario;
    res.status(200).json(resposta);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
};

const editarPerfil = async (req, res) => {
  let { nome, email, senha, adm } = req.body;
  const { id } = req.usuario;
  try {
    const usuario = await validarEmailUsuario(email)

    if (usuario && usuario.id != id) {
      return res
        .status(400)
        .json({ mensagem: "O e-mail informado pertence a outro usuário." });
    }

    let ehAdm;

    if (adm === "false") {
      ehAdm = false;
    } else if (verificarSenhaCorretaAdm(adm)) {
      ehAdm = true;
    }

    if (adm && !verificarSenhaCorretaAdm(adm) && adm !== "false") {
      return res.status(401).json({ mensagem: 'Credenciais de administrador incorretas! Verifique o valor de adm ou apague o campo.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await knex("usuarios")
      .update({
        nome,
        email,
        senha: senhaCriptografada,
        ehAdm
      })
      .where({ id });

    res.status(200).json({ mensagem: "Perfil atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
};

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, adm } = req.body;
  try {
    const usuario = await validarEmailUsuario(email);

    if (usuario) {
      return res
        .status(400)
        .json({ mensagem: "O e-mail informado pertence a outro usuário." });
    }


    if (!verificarSenhaCorretaAdm(adm)) {
      return res
        .status(401)
        .json({ mensagem: 'Credenciais de administrador incorretas! Verifique a senha ou apague o campo!' })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
        ehAdm: verificarSenhaCorretaAdm(adm)
      })
      .returning(["id", "nome", "email", "ehAdm"]);


    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })

  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await knex("usuarios");
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

const login = async (req, res) => {
  const { senha, email } = req.body;

  try {
    const emailEncontrado = await validarEmailUsuario(email);

    if (!emailEncontrado) {
      return res.status(400).json({ mensagem: "Credenciais Invalidas" });
    }

    const senhaCorreta = await bcrypt.compare(senha, emailEncontrado.senha)

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas.' })
    }

    const { senha: _, ...usuario } = emailEncontrado

    const token = jwt.sign({ id: emailEncontrado.id }, process.env.CHAVE_SECRETA, { expiresIn: '2h' })

    return res.status(201).json({ usuario, token })

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = {
  cadastrarUsuario,
  login,
  editarPerfil,
  detalharPerfilUsuario,
  listarUsuarios
};
