const { Documento, AprendizFicha } = require('../Models');
const path = require("path");
const fs = require("fs");


// Subir un documento
exports.crearDocumento = async (req, res) => {
    try {
        const { id_ficha_aprendiz, nombre, fecha, descripcion, num_documento } = req.body;

        if (!req.file) {
            return res.status(400).json({ mensaje: 'No se subió ningún archivo' });
        }

        const nuevoDocumento = await Documento.create({
            id_ficha_aprendiz,
            nombre, // por ejemplo: "Carta Laboral"
            fecha,
            descripcion,
            num_documento,
            archivo: req.file.filename
        });

        res.status(201).json({ mensaje: 'Documento creado exitosamente', documento: nuevoDocumento });
    } catch (error) {
        console.error("💥 Error al crear documento:", error.message);
        console.log("🪵 Detalle:", error);
        res.status(500).json({ mensaje: 'Error al crear el documento' });
    }
};


// Obtener todos los documentos
// Obtener documentos por ficha de aprendiz
exports.obtenerPorFicha = async (req, res) => {
    try {
        const { idFichaAprendiz } = req.params;

        const documentos = await Documento.findAll({
            where: { id_ficha_aprendiz: idFichaAprendiz },
            order: [['fecha', 'DESC']]
        });

        res.status(200).json(documentos);
    } catch (error) {
        console.error("Error al obtener documentos por ficha:", error);
        res.status(500).json({ mensaje: 'Error al obtener documentos por ficha' });
    }
};


// Obtener un documento por ID
exports.obtenerDocumentoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const documento = await Documento.findByPk(id, {
            include: [{ model: AprendizFicha, as: 'ficha' }]
        });

        if (!documento) {
            return res.status(404).json({ mensaje: 'Documento no encontrado' });
        }

        res.status(200).json(documento);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar el documento' });
    }
};

// Actualizar documento
exports.actualizarDocumento = async (req, res) => {
    try {
      const { id } = req.params;
      const documento = await Documento.findByPk(id);
  
      if (!documento) {
        return res.status(404).json({ mensaje: "Documento no encontrado" });
      }
  
      if (!req.file) {
        return res.status(400).json({ mensaje: "No se subió ningún archivo" });
      }
  
      // Elimina archivo anterior si existe
      if (documento.archivo) {
        const rutaAnterior = path.join(__dirname, "..", "uploads", "documentos", documento.archivo);
        try {
          if (fs.existsSync(rutaAnterior)) {
            fs.unlinkSync(rutaAnterior);
          }
        } catch (err) {
          console.warn("⚠️ No se pudo eliminar el archivo anterior:", err.message);
        }
      }
  
      // Actualizar campos
      documento.archivo = req.file.filename;
      documento.fecha = req.body.fecha || documento.fecha;
      documento.descripcion = req.body.descripcion || documento.descripcion;
  
      await documento.save();
  
      res.json({ mensaje: "Documento actualizado correctamente", documento });
    } catch (error) {
      console.error(" Error al actualizar documento:", error.message);
      res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
  };
  

// Eliminar documento
exports.eliminarDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        const documento = await Documento.findByPk(id);

        if (!documento) {
            return res.status(404).json({ mensaje: 'Documento no encontrado' });
        }

        await documento.destroy();
        res.status(200).json({ mensaje: 'Documento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el documento' });
    }
};

