const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/uploads');
const BitacoraController = require('../Controllers/Bitacoras');

// Subida de archivo PDF con validación
router.post('/archivo', upload.single('archivo'), BitacoraController.crearBitacora);

// Listado por aprendiz
router.get('/:id_ficha_aprendiz', BitacoraController.listarBitacoras);

// Eliminar bitácora por ID
router.delete('/:id', BitacoraController.eliminarBitacora);
router.put('/:id', upload.single('archivo'), BitacoraController.editarBitacora);

module.exports = router;
