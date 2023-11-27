const knex = require("../bancoDeDados/conexao");
const {
  validarEmailCliente,
  validarCpfCliente,
  validarClienteIdEncontrado,
} = require("../intermediarios/verificarDuplicacoes");

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex("clientes");
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;

  try {
    if (!Number(id)) {
      return res
        .status(400)
        .json({ mensagem: "O parâmetro de rota precisa ser um número!" });
    }

    const cliente = await knex("clientes").where({ id }).first();

    if (!cliente) {
      return res
        .status(404)
        .json({ mensagem: "O cliente informado não existe!" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const emailCliente = await validarEmailCliente(email);
    const cpfCliente = await validarCpfCliente(cpf);

    if (emailCliente && cpfCliente) {
      return res.status(400).json({
        mensagem:
          "O e-mail e o cpf informados pertencem a outro(s) cliente(s)!",
      });
    }
    if (emailCliente) {
      return res
        .status(400)
        .json({ mensagem: "O e-mail informado pertence a outro cliente!" });
    }

    if (cpfCliente) {
      return res
        .status(400)
        .json({ mensagem: "O cpf informado pertence a outro cliente!" });
    }

    const novoCliente = await knex("clientes")
      .insert({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      })
      .returning(["*"]);

    return res.status(201).json(novoCliente);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const editarPerfilCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const { id } = req.params;

  try {
    const cliente = await validarClienteIdEncontrado(id);
    const emailCliente = await validarEmailCliente(email);
    const cpfCliente = await validarCpfCliente(cpf);

    if (cliente && cliente.id != id) {
      //
      return res
        .status(400)
        .json({ mensagem: "O cliente informado não existe." });
    }

    if (emailCliente && emailCliente.email != email) {
      return res
        .status(400)
        .json({ mensagem: "O e-mail informado pertence a outro cliente." });
    }

    if (cpfCliente && cpfCliente.cpf != cpf) {
      return res
        .status(400)
        .json({ mensagem: "O cpf informado pertence a outro cliente." });
    }

    await knex("clientes")
      .update({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      })
      .where({ id });
    res.status(200).json({ mensagem: "Perfil atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  listarClientes,
  detalharCliente,
  cadastrarCliente,
  editarPerfilCliente,
};
