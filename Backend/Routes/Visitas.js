const express = require('express');
const router = express.Router();
const Visita = require('../Controllers/Visitas');


router.post('/', Visita.solicitarVisita);
router.get('/aprendiz/:id/ficha/:id_ficha', Visita.visitasPorAprendiz);
router.put("/:id", Visita.editarVisita);
router.delete("/:id", Visita.eliminarVisita);
module.exports = router;