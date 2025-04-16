
const express = require('express');
const router = express.Router();
const Ficha = require('../Controllers/Fichas');

router.get('/', Ficha.listarFichas);
router.get('/num-programa', Ficha.listarFichasNum)
router.post('/', Ficha.crearFicha);

module.exports = router;
