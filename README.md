# API Frente de caixa - Time 10

Trata-se de uma Restful API de uma aplicação de para um PDV (Frente de Caixa). Foi o desafio final no Curso de formação para Backend na Cubos Academy em parceria com o Ifood, desenvolvido em grupo. Utilizamos da metodologia SCRUM e o Trello para o dia a dia do desenvolvimento.

## Sumário

- [Visão geral](#visão-geral)
  - [Prints](#prints)
- [O processo](#o-processo)
  - [Desenvolvido com](#desenvolvido-com)
  - [Recursos utilizados](#recursos-utilizados)
  - [Pré-Requisitos](#pré-requisitos)
- [Como rodar o código?](#como-rodar-o-código)
  - [Passo 1 - Clone ou baixe o projeto](#passo-1---clone-ou-baixe-o-projeto)
  - [Passo 2 - Instalando dependências](#passo-2---instalando-dependências)
  - [Passo 3 - Configuração do Banco de Dados](#passo-3---configuração-do-banco-de-dados)
  - [Passo 4 - Configurando variáveis de ambiente](#passo-4---configurando-variáveis-de-ambiente)
  - [Passo 5 - Iniciando o projeto](#passo-5---iniciando-o-projeto)
  - [passo 6 - Testes(opcional)](#passo-6---testesopcional)

  
- [Uso](#Uso)
- [Contribuição](#Contribuição)
- [Autor](#autor)

## Visão geral

### Prints

![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/30f9fd0a-4cd1-44a5-862c-6d1ec784cd5f)

![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/d638b938-2cc7-4ae9-b67a-1c3de5c4d807)

![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/e7fc0dfc-1dfd-47dc-ba6e-a97fb13b0cd3)

![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/31d57863-4291-45c3-a11d-83179e379b16)


## O processo

### Desenvolvido com

- Javascript
- lógica de programação
- Node.JS
- Postgres
  
### Recursos utilizados

- [Express](https://expressjs.com/pt-br/) - Framework Node mais popular e a biblioteca subjacente para uma série de outros frameworks do Node.

- [bcrypt](https://www.npmjs.com/package/bcrypt) - Biblioteca de auxílio pra criação de hash de senhas.

- [Nodemon](https://nodemon.io/) - Monitora as mudanças nos arquivos do seu projeto e reinicia automaticamente o servidor Node. js quando necessário.
  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Biblioteca que cria um token de autenticação na sessão do usuário.
  
- [pg](https://www.npmjs.com/package/pg) - Biblioteca que faz a conexão do banco de dados Postgres com o Node.

- [aws-sdk](https://www.npmjs.com/package/aws-sdk) - É um conjunto de bibliotecas e ferramentas fornecido pela Amazon Web Services integrar serviços da AWS em suas aplicações, nesse caso será usado para upload de arquivos junto ao Backblaze.

- [Backblaze](https://www.backblaze.com/) - O Backblaze é uma empresa que oferece serviços de armazenamento em nuvem e backup online.

- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv é um módulo de dependência zero que carrega variáveis ​​de ambiente de um .envarquivo em process.env.

- [joi](https://www.npmjs.com/package/joi) - A mais poderosa linguagem de descrição de esquema e validador de dados para JavaScript.

- [knex](https://www.npmjs.com/package/knex) - Um construtor de esquemas e consultas SQL com baterias incluídas para PostgresSQL, MySQL, CockroachDB, MSSQL e SQLite3.

- [multer](https://www.npmjs.com/package/multer) - Multer é um middleware node.js para manipulação multipart/form-data, usado principalmente para upload de arquivos.

- [nodemailer](https://www.npmjs.com/package/nodemailer) - Envio de e-mails a partir do Node.js.

## Pré-Requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) - Um ambiente de tempo de execução JavaScript que você pode usar para executar o servidor backend;
  
- [Postgres](https://www.postgresql.org/download/) - Banco de dados SQL. 


### Como rodar o código?? 


#### passo 1 - Clone ou baixe o projeto

1. Abra o terminal do seu editor de código;
2. Navegue até a pasta onde deseja instalar o projeto;
3. Clone o projeto ```ex: git clone https://github.com/alexandreSouza31/API_frente_de_caixa_time10```, ou se preferir,baixe clicando no cotão verde chamado "Code" no repositório desse projeto, e depois "Download zip.

#### passo 2 - Instalando dependências

1. npm - Digite o seguinte comando no terminal `npm install`;
2. nodemon - Digite o seguinte comando no terminal `npm install -D nodemon`;

obs:Caso queira testar o Jest siga os passos abaixo:
3. Jest - Digite o seguinte comando no terminal `npm install -D jest`;
4. Jest - Digite o seguinte comando no terminal `npm install -D supertest`;


#### passo 3 - Configuração do Banco de Dados

1. Criando o Banco de Dados e as Tabelas no Banco

    a)Abra um terminal e acesse o PostgreSQL usando seu cliente preferido (por exemplo, psql, beekeeper, ou a extensão no VSCode Database Client);
     
    b)Para criar as tabelas necessárias, copie e/ou execute as tabelas do arquivo schema.sql, na pasta bancoDeDados em seu client PostgreSQL;


#### passo 4 - Configurando variáveis de ambiente
1. Renomeie o arquivo .env.exemple, na raiz do projeto para .env
2. Configure os campos no arquivo modificando de acordo com a suas credenciais.Já no campo SENHA_JWT você define a senha neste momento conforme sua preferência.
   Obs: Lembre-se de preencher sem espaços!

#### passo 5 - Iniciando o projeto
1. Inicie o servidor digitando `npm run dev` no terminal, ou use o Deploy: `https://desafiofinal-grupo10-cubos-ac.cyclic.app`;
2.  O servidor estará em execução em http://localhost:3000;
3. Use o Insomnia, Postman ou alguma extensão no seu programa de ambiente de desenvolvimento como o Thunder client do VS Code, por exemplo, para fazer as requisições;
4. Para testar os endpoints escreva as rotas com os parâmetros, a depender, de cada requisição;

#### passo 6 - Testes(opcional)
1. Inicie o servidor digitando `npm run test` no terminal. O teste será feito automaticamente;
obs: Alguns endpoints ainda está em desenvolvimento.

## Uso
A seguir estão as principais funcionalidades e endpoints da API:

### Rotas de Usuários

#### Cadastrar Usuário

- **Descrição**: Permite o cadastro de um novo usuário na aplicação.
- **Método HTTP**: POST
- **Rota**: `/usuario`
- **Intermediários**:
  - Verifica se o e-mail informado já está em uso.
  - Valida os campos obrigatórios do usuário.
- **Controlador**: `cadastrarUsuario`

#### Login

- **Descrição**: Autentica um usuário na aplicação.
- **Método HTTP**: POST
- **Rota**: `/login`
- **Intermediários**:
  - Validação dos campos de entrada.
- **Controlador**: `login`

#### Detalhar Perfil do Usuário

- **Descrição**: Retorna os detalhes do perfil do usuário autenticado.
- **Método HTTP**: GET
- **Rota**: `/usuario`
- **Intermediários**:
  - Verificação da autenticação do usuário.
- **Controlador**: `detalharPerfilUsuario`

#### Editar Perfil do Usuário

- **Descrição**: Permite a edição do perfil do usuário autenticado.
- **Método HTTP**: PUT
- **Rota**: `/usuario`
- **Intermediários**:
  - Verificação da autenticação do usuário.
  - Validação dos campos de entrada.
- **Controlador**: `editarPerfil`

### Rotas de Pedidos

#### Listar Categorias

- **Descrição**: Retorna a lista de categorias disponíveis.
- **Método HTTP**: GET
- **Rota**: `/categoria`
- **Controlador**: `listarCategorias`

#### Listar Pedidos

- **Descrição**: Retorna a lista de todos os pedidos cadastrados.
- **Método HTTP**: GET
- **Rota**: `/pedido`
- **Intermediários**:
  - Verificação da autenticação do usuário.
- **Controlador**: `listarPedidos`

#### Cadastrar Pedido

- **Descrição**: Permite o cadastro de um novo pedido na aplicação.
- **Método HTTP**: POST
- **Rota**: `/pedido`
- **Intermediários**:
  - Verificação da autenticação do usuário.
  - Validação dos campos de entrada.
- **Controlador**: `cadastrarPedido`

### Rotas de Produtos

#### Listar Produtos

- **Descrição**: Retorna a lista de todos os produtos cadastrados.
- **Método HTTP**: GET
- **Rota**: `/produto`
- **Intermediários**:
  - Verificação da autenticação do usuário.
- **Controlador**: `listarProdutos`

#### Detalhar Produto

- **Descrição**: Retorna os detalhes de um produto específico.
- **Método HTTP**: GET
- **Rota**: `/produto/:id`
- **Intermediários**:
  - Verificação da autenticação do usuário.
- **Controlador**: `detalharProduto`

#### Cadastrar Produto

- **Descrição**: Permite o cadastro de um novo produto na aplicação.
- **Método HTTP**: POST
- **Rota**: `/produto`
- **Intermediários**:
  - Verificação da autenticação do usuário.
  - Validação dos campos de entrada.
- **Controlador**: `cadastrarProduto`

#### Editar Produto

- **Descrição**: Permite a edição de um produto existente.
- **Método HTTP**: PUT
- **Rota**: `/produto/:id`
- **Intermediários**:
  - Verificação da autenticação do usuário.
  - Validação dos campos de entrada.
- **Controlador**: `editarProduto`

#### Excluir Produto

- **Descrição**: Permite a exclusão de um produto existente.
- **Método HTTP**: DELETE
- **Rota**: `/produto/:id`
- **Intermediários**:
  - Verificação da autenticação do usuário.
- **Controlador**: `excluirProdutoId`

### Rotas de Clientes

#### Listar Clientes

- **Descrição**: Retorna a lista de todos os clientes cadastrados.
- **Método HTTP**: GET
- **Rota**: `/cliente`
- **Intermediários**:
  - Verificação da autenticação do usuário.
- **Controlador**: `listarClientes`

#### Detalhar Cliente

- **Descrição**: Retorna os detalhes de um cliente específico.
- **Método HTTP**: GET
- **Rota**: `/cliente/:id`
- **Intermediários**:
  - Verificação da autenticação do usuário.
- **Controlador**: `detalharCliente`

#### Cadastrar Cliente

- **Descrição**: Permite o cadastro de um novo cliente na aplicação.
- **Método HTTP**: POST
- **Rota**: `/cliente`
- **Intermediários**:
  - Verificação da autenticação do usuário.
  - Validação dos campos de entrada.
- **Controlador**: `cadastrarCliente`

#### Editar Perfil do Cliente

- **Descrição**: Permite a edição do perfil do cliente autenticado.
- **Método HTTP**: PUT
- **Rota**: `/cliente/:id`
- **Intermediários**:
  - Verificação da autenticação do usuário.
  - Validação dos campos de entrada.
- **Controlador**: `editarPerfilCliente`



### Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests para melhorar este projeto.

:)

## Autores
### Time 10 


![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/0c2fb311-8d90-49cd-b1fe-746972cf64f0) - Alexandre Mariano - LinkdIn(https://www.linkedin.com/in/alexandresouza31/)  |  Github(https://github.com/alexandreSouza31)


![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/b67aacae-af86-409f-883e-3dd880407b53) - Emerson Sormany - LinkdIn(https://www.linkedin.com/in/emersonsormany/)  |  Github(https://github.com/EmerSormany)


![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/955a1046-433a-4fbe-8dda-7fbfa55a54f3) - Fabiano Lima - LinkdIn(https://www.linkedin.com/in/fabiano-lima-1792173b/)  |  Github(https://github.com/Fabis-li)


![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/1b1556be-d2e6-42bb-979f-66a80612fb6b) - Guilherme Hames - LinkdIn(https://www.linkedin.com/in/guilhames/)  |  Github(https://github.com/Guilhames)


![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/1ad02eb3-f3c0-401c-a35b-4510be70571a) - Rafael Pinheiro Maurício - LinkdIn(https://www.linkedin.com/in/rafael-pinheiro-mauricio-1a851221b/)  |  Github(https://github.com/RafaelPMauricio)


![image](https://github.com/alexandreSouza31/API_frente_de_caixa_time10/assets/112407769/a176905f-9c3c-48ee-b212-59abaffabbac) - Vinicius Baumann - LinkdIn(https://www.linkedin.com/in/viniciusbaumann/)  |  Github(https://github.com/ViniciusBaumann)
