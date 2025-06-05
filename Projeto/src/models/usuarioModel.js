var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idusuario, username, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(username, email, senha, genero) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", username, email, senha, genero);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (username, email, senha, genero) VALUES ('${username}', '${email}', '${senha}', '${genero}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function salvarquiz(Fkusuario, Fkquiz, Pontuacao, Respusuario) {
//       console.log(`acessando usuario model pra salvar resposta 
//         ID Usuário: ${Fkusuario},
//         ID Pergunta: ${Fkquiz},
//         Pontuação Total da Tentativa: ${Pontuacao}
//         Resposta Selecionada: ${Respusuario}, `);

//     // A instrução SQL INSERT agora usa as novas nomenclaturas e os valores passados
//     // 'respusuario' é uma string, por isso precisa de aspas simples na SQL
//    var instrucaoSql = `
//         INSERT INTO tentativa (Fkusuario, Fkpergunta, Acertou, Respusuario) VALUES ('${Fkusuario}', '${Fkpergunta}', '${acertou}', '${Respusuario}');
//     `;

//     console.log("Executando a instrução SQL para salvar resposta do quiz: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
    
// }

// module.exports = {
//     autenticar,
//     cadastrar,
//     salvarquiz 
// };
// models/usuarioModel.js

function salvarTentativa(fkUsuario, fkPergunta, acertou, respUsuario) {
    console.log(`Acessando o model para salvar tentativa:
        ID Usuário: ${fkUsuario},
        ID Pergunta: ${fkPergunta},
        Acertou: ${acertou},             
        Resposta Selecionada: ${respUsuario}`);

    var instrucaoSql = `
        INSERT INTO tentativa (Fkusuario, Fkpergunta, Acertou, Respusuario) VALUES (
            '${fkUsuario}', 
            '${fkPergunta}', 
            ${acertou},       
            '${respUsuario}'
        );
    `;

    console.log("Executando a instrução SQL para salvar tentativa: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function notaquiz(fkusuario) {
    console.log(`Acessando o model para puxar a nota:
        ID Usuário: ${fkusuario}`)

    var instrucaoSql = `
       select b.username, Sum(a.acertou) as 'nota' from tentativa as a join usuario as b on b.idusuario = a.Fkusuario where a.Fkusuario = ${fkusuario} group by b.username;
    `; 

    console.log("Executando a instrução SQL para Ver a nota do usuario \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function qntusuarios(fkusuario) {
    console.log(`Acessando o model para fazer select:
        ID Usuário: ${fkusuario}`)

    var instrucaoSql = `
       select truncate((count(Respusuario)/10),0) as qnt_pessoas from tentativa;
    `; 

    console.log("Executando a instrução SQL para ver quantidade de usuarios que fizeram o quiz \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function puxarntmedia(fkusuario) {
    console.log(`Acessando o model para fazer select:
        ID Usuário: ${fkusuario}`)

    var instrucaoSql = `
       SELECT truncate(AVG(notasusuarios.nota),2) AS notamedia
FROM ( SELECT  b.username, SUM(a.acertou) AS nota 
    FROM
        tentativa AS a
    JOIN
        usuario AS b ON b.idusuario = a.Fkusuario
    GROUP BY
        b.username 
) AS notasusuarios;
    `; 

    console.log("Executando a instrução SQL para ver a nota media no quiz \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function verificacaogenero(fkusuario) {
    console.log(`Acessando o model para fazer select:
        ID Usuário: ${fkusuario}`)

    var instrucaoSql = `
       SELECT genero, COUNT(idusuario) AS result
FROM usuario
GROUP BY genero
ORDER BY result DESC
LIMIT 1;
    `; 

    console.log("Executando a instrução SQL para ver qual genero tem mais contas \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function selectparaasnotas(fkusuario) {
    console.log(`Acessando o model para fazer select:
        ID Usuário: ${fkusuario}`)

    var instrucaoSql = `
      SELECT
    CASE
        WHEN notas_usuarios.nota BETWEEN 0 AND 3 THEN '0 a 3'
        WHEN notas_usuarios.nota BETWEEN 4 AND 7 THEN '4 a 7'
        WHEN notas_usuarios.nota BETWEEN 8 AND 10 THEN '8 a 10'
        ELSE 'Outra Faixa' -- Para notas fora dessas faixas (opcional, mas recomendado)
    END AS faixa_de_nota,
    COUNT(notas_usuarios.nota) AS quantidade_de_usuarios
FROM (
    SELECT
        b.idusuario,
        SUM(a.acertou) AS nota
    FROM
        tentativa AS a
    JOIN
        usuario AS b ON b.idusuario = a.Fkusuario
    GROUP BY
        b.idusuario
) AS notas_usuarios
GROUP BY
    faixa_de_nota
ORDER BY
    faixa_de_nota;
    `; 

    console.log("Executando a instrução SQL para ver a quantidade de notas dentro dos intervalos \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function notagrafico(fkusuario) {
    console.log(`Acessando o model para fazer select:
        ID Usuário: ${fkusuario}`)

    var instrucaoSql = `
       select b.username, count(a.acertou) as 'acertou' from tentativa as a join usuario as b on b.idusuario = a.Fkusuario where a.Fkusuario = 9 and a.acertou = 1 group by b.username;
    `; 

    console.log("Executando a instrução SQL para ver qual genero tem mais contas \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
     autenticar,
    cadastrar,
    salvarTentativa,
    notaquiz,
    qntusuarios,
    puxarntmedia,
    verificacaogenero,
    selectparaasnotas,
    notagrafico
};