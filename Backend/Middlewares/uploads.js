const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ruta del directorio donde se guardarán las bitácoras
const carpetaDestino = path.join(__dirname, '..', 'uploads', 'bitacoras');

// Asegurar que el directorio exista
if (!fs.existsSync(carpetaDestino)) {
  fs.mkdirSync(carpetaDestino, { recursive: true }); // Crea también los padres si no existen
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, carpetaDestino);
  },
  filename: function (req, file, cb) {
    const nombreUnico = `${Date.now()}-${file.originalname}`;
    cb(null, nombreUnico);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.pdf') {
    return cb(new Error('Solo se permiten archivos PDF'), false);
  }
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
