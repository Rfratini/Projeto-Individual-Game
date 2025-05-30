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

create table if not exists quiz 
(
idpergunta int primary key auto_increment, 
Resposta char(1)
);

create table if not exists tentativa 
(
Fkusuario int,
Fkquiz int,
primary key (Fkusuario, Fkquiz),
constraint usuarioFK foreign key (Fkusuario) references usuario(idusuario),
constraint QuizFK foreign key (Fkquiz) references quiz(idpergunta),
Pontuacao decimal(4,2),
Respusuario char(1)
);

insert into quiz values
(1, 'C'),
(2, 'A'),
(3, 'B'),
(4, 'D'),
(5, 'C'),
(6, 'A'),
(7, 'B'),
(8, 'C'),
(9, 'A'),
(10, 'D');