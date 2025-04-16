const express = require('express');
const router = express.Router();
const Documento = require('../Controllers/Documentos');

router.post('/', Documento.crearDocumento);
router.get('/', Documento.obtenerDocumentos);
router.get('/:id', Documento.obtenerDocumentoPorId);
router.put('/:id', Documento.actualizarDocumento);
router.delete('/:id', Documento.eliminarDocumento);

module.exports = router;
