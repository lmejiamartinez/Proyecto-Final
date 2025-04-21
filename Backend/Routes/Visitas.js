const express = require('express');
const router = express.Router();
const Visita = require('../Controllers/Visitas');

router.post('/', Visita.agendarVisita);
router.get('/', Visita.obtenerVisitas);
router.put('/:id', Visita.actualizarVisita);
router.delete('/:id', Visita.eliminarVisita);
router.get('/reporte-visitas/excel', Visita.generarReporteVisitas);
router.get('/reporte-visitas/pdf', Visita.generarReporteVisitasPDF);


module.exports = router;