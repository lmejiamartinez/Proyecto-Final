const express = require('express');
const router = express.Router();


const AprendizFicha = require('../Controllers/AprendizFicha');


router.get('/aprendices-ficha', AprendizFicha.obtenerTodos);
router.get('/fichas/:idaprendiz', AprendizFicha.obtenerFichasPorAprendiz);
router.get('/aprendiz/:idaprendiz/ficha/:idficha', AprendizFicha.obtenerFichaAprendiz);

router.get('/aprendices-ficha/:id', AprendizFicha.obtenerPorId);
router.post('/aprendices-ficha', AprendizFicha.crear);
router.put('/aprendices-ficha/:id', AprendizFicha.actualizar);
router.delete('/aprendices-ficha/:id', AprendizFicha.eliminar);
router.get('/:id_usuario', AprendizFicha.buscarPorUsuario); // si tienes esta función


module.exports = router;
