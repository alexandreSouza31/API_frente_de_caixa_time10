const express = require("express");
const { listarCategorias } = require("./controladores/categorias");
const {
  cadastrarUsuario,
  login,
  detalharPerfilUsuario,
  editarPerfil,
  listarUsuarios,
} = require("./controladores/usuarios");

const { 
  cadastrarProduto,
  editarProduto,
  listarProdutos,
  detalharProduto,
  excluirProdutoId,
} = require("./controladores/produtos");

const { listarClientes, detalharCliente, cadastrarCliente, editarPerfilCliente } = require("./controladores/clientes");
const { listarPedidos, cadastrarPedido } = require("./controladores/pedidos");

const autenticadorUsuario = require("./intermediarios/token");
const validarCorpo = require("./intermediarios/validarCorpo");

const joiUsuario = require("./esquemas/esquemaUsuario");
const joiLogin = require("./esquemas/esquemaLogin");
const joiProduto = require("./esquemas/esquemaProduto");
const joiCadastrar = require("./esquemas/esquemaCliente");
const { joiPedido } = require("./esquemas/esquemaPedido");

const multer = require('./intermediarios/multer')
const s3 = require('./serviços/s3');
const {verificarPermissaoAdmin} = require("./intermediarios/verificaAdm");

const rotas = express();

rotas.get("/arquivos", async(req,res)=>{
    try {
      const arquivos = await s3.listObjects({
        Bucket: process.env.BACKBLAZE_BUCKET
      }).promise()
      return res.json(arquivos)
    } catch (error) {
      return res.status(500),json({mensagem:"erro no server"})
    }
})

rotas.get("/categoria", listarCategorias);
rotas.post("/usuario", validarCorpo(joiUsuario), cadastrarUsuario);
rotas.post("/login", validarCorpo(joiLogin), login);

rotas.use(autenticadorUsuario);
rotas.get("/usuarios",verificarPermissaoAdmin, listarUsuarios)

rotas.get("/usuario", detalharPerfilUsuario);
rotas.get("/pedido", listarPedidos);
rotas.post("/pedido",validarCorpo(joiPedido),  cadastrarPedido);
rotas.put("/usuario", validarCorpo(joiUsuario), editarPerfil);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto)
rotas.post("/produto", multer.single('produto_imagem'),  validarCorpo(joiProduto), cadastrarProduto);
rotas.put("/produto/:id", multer.single('produto_imagem'), validarCorpo(joiProduto), editarProduto);

rotas.get("/cliente", listarClientes);
rotas.get("/cliente/:id", detalharCliente);
rotas.post("/cliente", validarCorpo(joiCadastrar), cadastrarCliente)
rotas.put("/cliente/:id", validarCorpo(joiCadastrar), editarPerfilCliente)
rotas.delete("/produto/:id",excluirProdutoId)

module.exports = rotas;
