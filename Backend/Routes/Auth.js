// Routes/LoginRoutes.js
const express = require('express');
const router = express.Router();
const { login, registro, verificarToken, obtenerPerfil, actualizarInstructor,actualizarAprendiz } = require('../Controllers/auth'); // Ajusta la ruta al controlador de autenticación
const { forgotPassword, resetPassword } = require('../Controllers/auth');
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


// Ruta para el login (POST porque el frontend enviará las credenciales)
router.post('/login', login);

// Ruta para el registro (si tienes una)
router.post('/registro', registro);

router.get('/verificar', verificarToken)

router.get('/perfil', obtenerPerfil);
router.put("/instructor", actualizarInstructor);
router.put("/aprendiz", actualizarAprendiz);



module.exports = router;
