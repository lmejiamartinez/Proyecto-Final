const express = require('express');
const router = express.Router();
const usuarioRoutes = require('./Usuarios');
const visitasRoutes = require('./Visitas');
const documentosRoutes = require('./Documentos');
const fichasRoutes = require('./Fichas');

router.use('/usuarios', usuarioRoutes);
router.use('/visitas', visitasRoutes);
router.use('/documentos', documentosRoutes);
router.use('/fichas', fichasRoutes);
module.exports = router;