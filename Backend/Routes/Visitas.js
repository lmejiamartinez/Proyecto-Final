const express = require('express');
const router = express.Router();
const Visita = require('../Controllers/Visitas');


router.post('/', Visita.solicitarVisita);


module.exports = router;