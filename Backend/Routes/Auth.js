// Routes/LoginRoutes.js
const express = require('express');
const router = express.Router();
const { login, registro, verificarToken } = require('../Controllers/auth'); // Ajusta la ruta al controlador de autenticación

// Ruta para el login (POST porque el frontend enviará las credenciales)
router.post('/login', login);

// Ruta para el registro (si tienes una)
router.post('/registro', registro);

router.post('/verificar', verificarToken)

module.exports = router;
