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


module.exports = {
     autenticar,
    cadastrar,
    salvarTentativa
};