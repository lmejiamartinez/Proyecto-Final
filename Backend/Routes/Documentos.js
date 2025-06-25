const express = require('express');
const router = express.Router();
const DocumentoController = require('../Controllers/Documentos');
const upload = require('../Middlewares/uploadsDocumentos'); // antes era uploads

console.log("💥 Documento routes cargado");

router.post('/archivo', upload.single('archivo'), DocumentoController.crearDocumento);
router.get('/ficha/:idFichaAprendiz', DocumentoController.obtenerPorFicha);
router.get('/:id', DocumentoController.obtenerDocumentoPorId);
router.put('/archivo/:id', upload.single('archivo'), DocumentoController.actualizarDocumento);
router.delete('/:id', DocumentoController.eliminarDocumento);

module.exports = router;

