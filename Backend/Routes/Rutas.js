// Routes/Rutas.js
const express = require('express');
const router = express.Router();
const UsuarioRoutes = require('./Usuarios');
const VisitasRoutes = require('./Visitas');
const DocumentosRoutes = require('./Documentos');
const FichasRoutes = require('./Fichas');
const AuthRoutes = require('./Auth');
const AprendizFichaRoutes = require('./AprendizFicha');
const NotificacionRoutes = require('./Notificaciones');
const BitacorasRoutes = require ('./Bitacoras');



router.use('/usuarios', UsuarioRoutes);
router.use('/visitas', VisitasRoutes);
router.use('/documentos', DocumentosRoutes);
router.use('/fichas', FichasRoutes);
router.use('/bitacoras', BitacorasRoutes);
router.use('/aprendizFicha', AprendizFichaRoutes);
router.use('/auth', AuthRoutes);
router.use('/notificaciones',NotificacionRoutes);



module.exports = router;
