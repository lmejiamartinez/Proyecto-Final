
const express = require('express');
const router = express.Router();
const Ficha = require('../Controllers/Fichas');

router.get('/:idinstructor', Ficha.listarFichas);
router.get('/:num-programa', Ficha.listarFichasNum)
router.post('/', Ficha.crearFicha);
router.delete('/EliminarFicha/:id', Ficha.eliminarFicha);




module.exports = router;
