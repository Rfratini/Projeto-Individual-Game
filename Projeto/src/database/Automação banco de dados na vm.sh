#!/bin/bash

# Parâmetros de conexão
USUARIO="root"
SENHA="SPTech#2024"
HOST="localhost"

# Nome do arquivo SQL temporário
ARQUIVO_SQL="script_projetogow.sql"

# Criar o arquivo SQL
cat <<EOF > $ARQUIVO_SQL
$(cat <<'SQL'
create database if not exists projetoGow;
use projetoGow;

create table if not exists usuario 
(
idusuario int primary key auto_increment,
username varchar(20) not null,
email varchar(45) not null unique,
senha varchar(20) not null,
genero varchar(20) not null
);

create table if not exists pergunta 
(
idpergunta int primary key auto_increment, 
pergunta varchar(250) not null, 
Resposta char(1)  not null
);

create table if not exists tentativa 
(
Fkusuario int,
Fkpergunta int,
primary key (Fkusuario, Fkpergunta),
constraint usuarioFK foreign key (Fkusuario) references usuario(idusuario),
constraint PgFK foreign key (Fkpergunta) references pergunta(idpergunta),
Acertou boolean not null,
Respusuario char(1)
);

INSERT INTO pergunta (pergunta, Resposta) VALUES
('Quem forjou o machado de Kratos?', 'C'),
('Quem é o principal vilão de God of War(2018)?', 'A'),
('Quem forjou as Lâminas do Caos?', 'B'),
('Quem são os pais de Baldur?', 'D'),
('Qual fenômeno teve início após a morte de Baldur?', 'C'),
('Quem é o pai de Kratos?', 'A'),
('Quem é Atreus na mitologia nórdica?', 'B'),
('Por que a pele de Kratos é toda branca?', 'C'),
('Qual era a intenção principal de Odin ao visitar Kratos no início de God of War Ragnarök?', 'A'),
('Qual arma Kratos forjou em God of War Ragnarök?', 'D');

)
EOF

# Executar o script SQL no MySQL
mysql -u$USUARIO -p$SENHA -h$HOST < $ARQUIVO_SQL

# Opcional: remover o arquivo SQL
rm $ARQUIVO_SQL

