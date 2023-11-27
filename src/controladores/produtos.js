const knex = require("../bancoDeDados/conexao");
const encontrarCategoriaPorId = require("../utils/encontrarCategoria");
const encontrarProdutoPorId = require("../utils/encontrarProduto");
const s3 = require("../serviços/s3");

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    let produto_imagem = req.file;

    try {
        const categoriaEncontrada = await encontrarCategoriaPorId(categoria_id);
        if (!categoriaEncontrada) {
            return res
                .status(400)
                .json({ mensagem: "A categoria informada não existe!" });
        }

        if (produto_imagem) {
            const novoArquivo = await s3
                .upload({
                    Bucket: process.env.BACKBLAZE_BUCKET,
                    Key: produto_imagem.originalname,
                    Body: produto_imagem.buffer,
                    ContentType: produto_imagem.mimetype,
                })
                .promise();
            produto_imagem = novoArquivo.Location;
        } else {
            produto_imagem = null;
        }

        const novoProduto = await knex("produtos")
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem,
            })
            .returning(["*"]);

        return res.status(201).json(novoProduto);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};
const editarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { id } = req.params;
    let produto_imagem = req.file;
    try {
        const categoriaEncontrada = await encontrarCategoriaPorId(categoria_id);
        if (!categoriaEncontrada) {
            return res
                .status(400)
                .json({ mensagem: "A categoria informada não existe!" });
        }

        const produtoEncontrado = await encontrarProdutoPorId(id);
        if (!produtoEncontrado) {
            return res
                .status(400)
                .json({ mensagem: "O produto informado não existe!" });
        }

        if (produto_imagem) {
            const novoArquivo = await s3
                .upload({
                    Bucket: process.env.BACKBLAZE_BUCKET,
                    Key: produto_imagem.originalname,
                    Body: produto_imagem.buffer,
                    ContentType: produto_imagem.mimetype,
                })
                .promise();
            produto_imagem = novoArquivo.Location;
        } else {
            produto_imagem = null;
        }

        await knex("produtos")
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem,
            })
            .where({ id });

        res.status(200).json({ mensagem: "Produto atualizado com sucesso" });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};
const listarProdutos = async (req, res) => {
    const categoria_id = req.query.categoria_id;

    try {
        if (categoria_id) {
            const categoria = await encontrarCategoriaPorId(categoria_id);
            if (!categoria) {
                return res
                    .status(400)
                    .json({ mensagem: "A categoria informada não existe!" });
            }

            const produtos = await knex("produtos").where({ categoria_id });
            return res.status(200).json(produtos);
        } else {
            const produtos = await knex("produtos");
            return res.status(200).json(produtos);
        }
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const detalharProduto = async (req, res) => {
    const { id } = req.params;
    try {
        if (!Number(id)) {
            return res.status(400).json({ mensagem: 'O campo id deve ser numérico.' })
        }

        const produtoEncontrado = await encontrarProdutoPorId(id);

        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        return res.status(200).json(produtoEncontrado);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const excluirProdutoId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number(id)) {
            return res
                .status(400)
                .json({ mensagem: "O Parametro de rota precisa ser um número" });
        }

        const produtoEncontrado = await encontrarProdutoPorId(id);

        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        const produtoPedido = await knex("pedidos_produtos")
            .where("produto_id", id)
            .first();

        if (produtoPedido) {
            return res.status(403).json({
                mensagem:
                    "O produto não pode ser excluído por estar vinculado a um pedido",
            });
        }

        const produto_deletado = await knex("produtos")
            .where({ id })
            .del()
            .returning("*");

        const produto_imagem = produto_deletado[0].produto_imagem;

        if (produto_imagem) {
            const deletarImagemProduto = await s3
                .deleteObject({
                    Bucket: process.env.BACKBLAZE_BUCKET,
                    Key: produto_imagem,
                })
                .promise();
        }
        return res.status(200).json({ mensagem: "Produto deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    excluirProdutoId,
};
