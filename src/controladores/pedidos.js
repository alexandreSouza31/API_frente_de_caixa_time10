const knex = require("../bancoDeDados/conexao");
const encontrarClientePorId = require("../utils/encontrarCliente");
const transporter = require("../serviços/nodemailer");
const html = require("../utils/templateHtml/geradorHtml");
const encontrarPedidoPorIdCliente = require("../utils/encontrarPedido");
const encontrarProdutoPorId = require("../utils/encontrarProduto");

const listarPedidos = async (req, res) => {
    try {
        let pedidos;

        if (req.query.cliente_id) {
            const cliente = await encontrarClientePorId(req.query.cliente_id);

            if (!cliente) {
                return res.status(404).json({ mensagem: "O cliente informado não existe" });
            }

            const pedidosDoCliente = await encontrarPedidoPorIdCliente(cliente.id);

            if (pedidosDoCliente.length===0) {
                return res.status(404).json({ mensagem: "Não há pedidos para o cliente informado" });
            }

            pedidos = await knex("pedidos")
                .select("id", "valor_total", "observacao", "cliente_id")
                .where("cliente_id", req.query.cliente_id);
        } else {
            pedidos = await knex("pedidos").select("id", "valor_total", "observacao", "cliente_id");
        }

        const resultado = await Promise.all(pedidos.map(async (pedido) => {
            const pedidoProdutos = await knex("pedidos_produtos")
                .select(
                    "pedidos_produtos.id",
                    "pedidos_produtos.quantidade_produto",
                    "pedidos_produtos.valor_produto",
                    "pedidos_produtos.produto_id",
                    "produtos.descricao as produto_descricao",
                    "produtos.produto_imagem"
                )
                .join("produtos", "pedidos_produtos.produto_id", "=", "produtos.id")
                .where("pedido_id", pedido.id);

            return {
                pedido: {
                    id: pedido.id,
                    valor_total: pedido.valor_total,
                    observacao: pedido.observacao,
                    cliente_id: pedido.cliente_id
                },
                pedido_produtos: pedidoProdutos
            };
        }));

        return res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const cadastrarPedido = async (req, res) => {
    const { cliente_id, pedido_produtos, observacao } = req.body
    try {
        const clienteExsitente = await encontrarClientePorId(cliente_id)

        if (!clienteExsitente) {
            return res.status(404).json({ mensagem: "Cliente não encontrado" });
        }

        let produtosNaoEncontrados = []
        let produtoEncontrado = []

        for (const produto of pedido_produtos) {
            const produtoAchado = await encontrarProdutoPorId(produto.produto_id)
            if (!produtoAchado) {
                produtosNaoEncontrados.push(produto)
            }
            produtoEncontrado.push(produtoAchado)
        }

        const produtosQuantidadeAcima = []
        let i = 0
        for (const produto of produtoEncontrado) {
            if (produto) {
                if (produto.quantidade_estoque <= pedido_produtos[i].quantidade_produto) {
                    produtosQuantidadeAcima.push(pedido_produtos[i])     
                }
            }
            i++
        }

        if (produtosNaoEncontrados.length > 0) {
            return res.status(400).json({ 
                mensagem: "Produtos não encontrados em nosso estoque", 
                produtos: produtosNaoEncontrados,
            });
        }
        if (produtosQuantidadeAcima.length > 0) {
            return res.status(400).json({
                mensagem: "Produtos insuficientes em nosso estoque",
                produtos: produtosQuantidadeAcima
            });
        }

        let valor_total = 0;
        for (const produto1 of produtoEncontrado) {
            for (const produto2 of pedido_produtos) {
                if (produto1.id === produto2.produto_id) {
                    valor_total = valor_total + (produto1.valor * produto2.quantidade_produto)
                    break
                }
            }
        }

        const pedido = await knex('pedidos').insert({ cliente_id, observacao, valor_total }).returning('id')

        for (const produto1 of produtoEncontrado) {
            for (const produto2 of pedido_produtos) {
                if (produto1.id === produto2.produto_id) {
                    await knex('pedidos_produtos').insert({
                        pedido_id: pedido[0].id,
                        produto_id: produto1.id,
                        quantidade_produto: produto2.quantidade_produto,
                        valor_produto: produto1.valor
                    })
                    await knex('produtos').where('id', '=', produto1.id).update({
                        quantidade_estoque: produto1.quantidade_estoque - produto2.quantidade_produto
                    })
                    break
                }
            }
        }


        let descProdPedido =
            produtoEncontrado.map((produto) => {
                return produto.descricao
            })

        transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: clienteExsitente.email,
            subject: `${clienteExsitente.nome} - Pedido ${pedido[0].id}`,
            html: html(clienteExsitente.nome, descProdPedido)
        })

        return res.status(201).send();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }

}

module.exports = {
    listarPedidos,
    cadastrarPedido
};
