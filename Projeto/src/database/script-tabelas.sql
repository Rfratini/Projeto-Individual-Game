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

select * from tentativa;

insert into usuario(username, email, senha, genero) values 
('Marquin', 'marco.silva@gmail.com', 'marco123', 'Masculino'),
('Collyzinha', 'nicolly3@gmail.com', 'corinthians', 'Feminino'),
('Joaozinhogamer', 'jp.soares@gmail.com', 'jpmago', 'Masculino'),
('Ferbs', 'Fernando.padrao@gmail.com', 'thubis123', 'Masculino'),
('Fra', 'fra.tini@gmail.com', 'gow123', 'Masculino');

insert into tentativa values
(1, 1, 1, 'C'),
(1, 2, 1, 'A'),
(1, 3, 1, 'B'),
(1, 4, 1, 'D'),
(1, 5, 1, 'C'),
(1, 6, 1, 'A'),
(1, 7, 1, 'B'),
(1, 8, 1, 'C'),
(1, 9, 1, 'A'),
(1, 10, 1, 'D');

insert into tentativa values
(2, 1, 0, 'A'),
(2, 2, 0, 'C'),
(2, 3, 1, 'B'),
(2, 4, 1, 'D'),
(2, 5, 0, 'D'),
(2, 6, 1, 'A'),
(2, 7, 1, 'B'),
(2, 8, 0, 'A'),
(2, 9, 1, 'A'),
(2, 10, 0, 'B');

insert into tentativa values
(3, 1, 1, 'C'),
(3, 2, 0, 'D'),
(3, 3, 1, 'B'),
(3, 4, 0, 'A'),
(3, 5, 1, 'C'),
(3, 6, 1, 'A'),
(3, 7, 0, 'C'),
(3, 8, 0, 'B'),
(3, 9, 1, 'A'),
(3, 10, 1, 'D');

insert into tentativa values
(4, 1, 0, 'A'),
(4, 2, 0, 'C'),
(4, 3, 0, 'D'),
(4, 4, 0, 'A'),
(4, 5, 0, 'B'),
(4, 6, 0, 'C'),
(4, 7, 1, 'B'),
(4, 8, 0, 'A'),
(4, 9, 1, 'A'),
(4, 10, 0, 'B');

insert into tentativa values
(5, 1, 0, 'B'),
(5, 2, 1, 'A'),
(5, 3, 0, 'C'),
(5, 4, 0, 'C'),
(5, 5, 1, 'C'),
(5, 6, 1, 'A'),
(5, 7, 0, 'A'),
(5, 8, 0, 'D'),
(5, 9, 1, 'A'),
(5, 10, 1, 'D');