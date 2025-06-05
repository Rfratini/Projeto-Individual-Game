var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/quiz", function (req, res) {
   usuarioController.quiz(req, res);
});

router.get("/:idusuario/quiz/nota", function (req, res) {
   usuarioController.puxarnota(req, res);
});

router.get("/:idusuario/quiz/qnt", function (req, res) {
   usuarioController.qntusuarios(req, res);
});

router.get("/:idusuario/quiz/notamedia", function (req, res) {
   usuarioController.puxarnotamedia(req, res);
});

router.get("/:idusuario/quiz/maiorgenero", function (req, res) {
   usuarioController.verificargenero(req, res);
});

router.get("/:idusuario/quiz/graficonotas", function (req, res) {
   usuarioController.puxarnotas(req, res);
});
router.get("/:idusuario/quiz/graficonotaindividual", function (req, res) {
   usuarioController.puxarindividual(req, res);
});

module.exports = router;