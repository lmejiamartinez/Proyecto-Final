const express = require('express');
const router = express.Router();
const Visita = require('../Controllers/Visitas');
const { verificarToken } = require('../Middlewares/auth');

router.post('/', verificarToken, Visita.agendarVisita);
router.get('/', verificarToken, Visita.obtenerVisitas);
router.put('/:id', verificarToken, Visita.actualizarVisita);
router.delete('/:id', verificarToken, Visita.eliminarVisita);
router.get('/reporte-visitas/excel', verificarToken, Visita.generarReporteVisitas);
router.get('/reporte-visitas/pdf', verificarToken, Visita.generarReporteVisitasPDF);


module.exports = router;