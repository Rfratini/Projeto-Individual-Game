create database projetoGow;
use projetoGow;

create table if not exists usuario 
(
idusuario int primary key auto_increment,
username varchar(20) not null,
email varchar(45) not null unique,
senha varchar(20) not null,
genero varchar(9) not null
);

