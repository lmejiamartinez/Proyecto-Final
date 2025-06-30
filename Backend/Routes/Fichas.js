
const express = require('express');
const router = express.Router();
const Ficha = require('../Controllers/Fichas');
const verificarToken = require("../Middlewares/verificarToken");
const { permitirRol } = require("../Middlewares/auth");

router.get("/instructor", verificarToken, permitirRol(["Instructor"]), Ficha.listarFichas);
router.get('/:num-programa', Ficha.listarFichasNum)
router.post('/', Ficha.crearFicha);
router.delete('/EliminarFicha/:id', Ficha.eliminarFicha);




module.exports = router;
