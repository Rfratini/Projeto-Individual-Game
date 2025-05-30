var usuarioModel = require("../models/usuarioModel");
function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                   if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        console.log("Usuário encontrado: ", resultadoAutenticar[0]);
                        console.log("Autenticação realizada com sucesso!");
                        res.json({
                            id: resultadoAutenticar[0].idusuario,
                            email: resultadoAutenticar[0].email,
                            username: resultadoAutenticar[0].username,
                            senha: resultadoAutenticar[0].senha,
                            genero: resultadoAutenticar[0].genero
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var username = req.body.usernameServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var genero = req.body.generoServer;

    // Faça as validações dos valores
    if (username == undefined) {
        console.log("Seu nome está undefined!");
    } else if (email == undefined) {
       console.log("Seu email está undefined!");
    } else if (senha == undefined) {
        console.log("Sua senha está undefined!");
    } else if (genero == undefined) {
       console.log("Sua Seu gênero está undefined!");
    }  else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(username, email, senha, genero)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
/*
function finaçiar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var Fkquiz = req.body.usernameServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var genero = req.body.generoServer;

    // Faça as validações dos valores
    if (username == undefined) {
        console.log("Seu nome está undefined!");
    } else if (email == undefined) {
       console.log("Seu email está undefined!");
    } else if (senha == undefined) {
        console.log("Sua senha está undefined!");
    } else if (genero == undefined) {
       console.log("Sua Seu gênero está undefined!");
    }  else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(username, email, senha, genero)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
    */
module.exports = {
    autenticar,
    cadastrar,
    // quiz
}