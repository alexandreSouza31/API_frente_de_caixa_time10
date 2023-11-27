const gerarHtml = (nomeDoUsuario, descricaoProdutoPedido) => {
    const urlImagem ="https://f005.backblazeb2.com/file/exerc-upload-cubos/produtos/72/pedidoRecebido.png"
    const html=`
    <!doctype html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="font-family: sans-serif;">
      <div style="display: block; margin: auto; max-width: 600px; border-radius:10px" class="main">
        <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px; padding:10px; text-align:center;">Obrigado por comprar conosco, ${nomeDoUsuario}!</h1>
        <h2 style="font-size: 16px; font-weight: bold; margin-top: 20px; padding:10px; text-align:center;">Descrição do Produtos adquiridos: ${descricaoProdutoPedido}</h2>
        <img alt="Inspect with Tabs" src=${urlImagem} style="width: 100%;">
        <p style="text-align:center; padding:10px;">Estamos à disposição pra enventuais dúvidas nos canais de atendimento.</p>
        <p style="text-align:right; padding:10px;">Time10 | Todos os direitos reservados © .</p>
      </div>
      <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
      <style>
        .main { background-color: white; }
        a:hover { border-left-width: 1em; min-height: 2em; }
      </style>
    </body>
  </html>`
    
    return html;
}

module.exports = gerarHtml;