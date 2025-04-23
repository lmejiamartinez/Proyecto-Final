const express = require('express');
const router = express.Router();
const AprendizFicha = require('../Controllers/AprendizFicha');

router.get('/aprendices-ficha', AprendizFicha.obtenerTodos);
router.get('/aprendices-ficha/:id', AprendizFicha.obtenerPorId);
router.post('/aprendices-ficha', AprendizFicha.crear);
router.put('/aprendices-ficha/:id', AprendizFicha.actualizar);
router.delete('/aprendices-ficha/:id', AprendizFicha.eliminar);

module.exports = router;