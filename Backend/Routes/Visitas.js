const express = require('express');
const router = express.Router();
const Visita = require('../Controllers/Visitas');

router.post('/solicitarVisita', Visita.solicitarVisita);
router.get('/aprendiz/:id/ficha/:id_ficha', Visita.visitasPorAprendiz); // ✅ Esta es la que el frontend usa
router.get('/obtenerVisita/:id',Visita.obtenerVisitaPorId );
router.put("/actualizar/:id", Visita.editarVisita);
router.delete("/eliminar/:id", Visita.eliminarVisita);

module.exports = router;
