drop database if exists pdv;

create database pdv;

drop table if exists usuarios;

create table
    usuarios (
        id serial primary key not null,
        nome text,
        email text UNIQUE,
        senha text
    );

ALTER TABLE usuarios ADD COLUMN ehAdm BOOLEAN DEFAULT FALSE;

drop table if exists categorias;

create table
    categorias(
        id serial primary key not null,
        descricao text
    );
    
drop table if exists produtos;

create table
    produtos(
        id serial primary key not null,
        descricao text,
      	quantidade_estoque integer,
      	valor integer,
      	categoria_id integer references categorias(id)
    );

drop table if exists clientes;

create table
    clientes(
        id serial primary key not null,
        nome text,
      	email text UNIQUE,
      	cpf text UNIQUE,
      	cep text,
      	rua text,
      	numero text,
      	bairro text,
      	cidade text,
      	estado text
    );
    
drop table if exists pedidos;

create table
    pedidos(
        id serial primary key not null,
        cliente_id integer references clientes(id),
	    observacao text,
      	valor_total integer
    );
    
drop table if exists pedidos_produtos;

create table
    pedidos_produtos(
        id serial primary key not null,
        pedido_id integer references pedidos(id),
     	produto_id integer references produtos(id),
	    quantidade_produto integer,
      	valor_produto integer
    );

ALTER TABLE produtos
ADD COLUMN produto_imagem text;

insert into
    categorias (descricao)
values ('Informática'), ('Celulares'), ('Beleza e Perfumaria'), ('Mercado'), ('Livros e Papelaria'), ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');