// Routes/Rutas.js
const express = require('express');
const router = express.Router();
const usuarioRoutes = require('./Usuarios');
const visitasRoutes = require('./Visitas');
const documentosRoutes = require('./Documentos');
const fichasRoutes = require('./Fichas');
const AuthRoutes = require('./Auth');
const AprendizFichaRoutes = require('./AprendizFicha');


router.use('/usuarios', usuarioRoutes);
router.use('/visitas', visitasRoutes);
router.use('/documentos', documentosRoutes);
router.use('/fichas', fichasRoutes);
router.use('/auth', AuthRoutes);
router.use('/aprendizFicha', AprendizFichaRoutes);


module.exports = router;
