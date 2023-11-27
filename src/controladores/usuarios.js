const knex = require("../bancoDeDados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validarEmailUsuario } = require("../intermediarios/verificarDuplicacoes");

const detalharPerfilUsuario = async (req, res) => {
  try {
    const resposta = req.usuario;
    res.status(200).json(resposta);
  } catch (error) {
    return res.status(500).json({mensagem: 'Erro interno do servidor'})
  }
};

const editarPerfil = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;
  try {
    const usuario = await validarEmailUsuario(email)

    if (usuario && usuario.id != id) {
      return res
        .status(400)
        .json({ mensagem: "O e-mail informado pertence a outro usuário." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await knex("usuarios")
      .update({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .where({ id });
    res.status(200).json({ mensagem: "Perfil atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({mensagem: 'Erro interno do servidor'})
  }
};

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await validarEmailUsuario(email);
    
    if (usuario) {
      return res
        .status(400)
        .json({ mensagem: "O e-mail informado pertence a outro usuário." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning(["id", "nome", "email"]);

    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({mensagem: 'Erro interno do servidor'})
    
  }
};

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
        return res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
}

module.exports = {
  cadastrarUsuario,
  login,
  editarPerfil,
  detalharPerfilUsuario,
};
