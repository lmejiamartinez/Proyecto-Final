// routes/auth.js
const express = require('express');
const router = express.Router();
const { solicitarReset, resetearContrasena } = require('../Controllers/password');

router.post('/solicitar-reset', solicitarReset);
router.post('/reset-password/:token', resetearContrasena);

module.exports = router;
