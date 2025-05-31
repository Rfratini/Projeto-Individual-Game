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

 async function salvarquiz(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // Fkusuario, Fkquiz, Pontuacao, Respusuario
    var Fkusuario = req.body.FkusuarioServer;
    var Fkquiz = req.body.FkquizServer;
    var Pontuacao = req.body.PontuacaoServer;
    var Respusuario = req.body.RespusuarioServer;

    // Faça as validações dos valores
    if (Fkusuario == undefined || Fkquiz == undefined || Respusuario == undefined || !Array.isArray(Respusuario)) {
        res.status(400).send("Dados do quiz incompletos ou inválidos! Verifique fk_idUsuario, pontuacao e respostasDoUsuario.");
        return;
    }  try {
    
      // Array para guardar todas as promessas de inserção de respostas
        const promessasDeInsercao = [];

        // Itera sobre cada resposta individual no array
        for (const resposta of Respusuario) {
            // Valida se a resposta individual tem os campos necessários
            if (resposta.Fkquiz == undefined || resposta.Respusuario == undefined) {
                console.warn("Uma resposta individual dentro do array está incompleta. Pulando:", resposta);
                continue; // Pula esta resposta e continua para a próxima
            }

            // Adiciona a promessa de inserção para cada resposta ao array
            // O model 'salvarRespostaQuiz' será chamado para cada resposta
            promessasDeInsercao.push(
                usuarioModel.salvarRespostaQuiz(
                    Fkusuario,
                    resposta.Fkquiz,
                    resposta.Respusuario,
                    Pontuacao // A pontuação total é enviada para cada registro de resposta
                )
            );
        }

        // Aguarda que todas as operações de inserção no banco de dados sejam concluídas
        const resultados = await Promise.all(promessasDeInsercao);
        
        console.log("Todas as respostas do quiz salvas com sucesso no BD!");
        // Envia uma resposta de sucesso ao frontend
        res.status(200).json({ message: "Quiz salvo com sucesso!", resultados: resultados });

    } catch (erro) {
        // Captura e loga qualquer erro que ocorra durante o processo de salvamento
        console.error("Erro ao salvar quiz no controller:", erro.sqlMessage || erro.message);
        // Envia uma resposta de erro detalhada ao frontend
        res.status(500).json({ error: "Erro ao salvar quiz.", details: erro.sqlMessage || erro.message });
    }
 }
    
module.exports = {
    autenticar,
    cadastrar,
    salvarquiz

}

