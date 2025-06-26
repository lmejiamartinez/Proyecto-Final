const { Bitacora, AprendizFicha } = require('../Models');
const path = require('path');
const fs = require('fs');

exports.crearBitacora = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { id_ficha_aprendiz, num_bitacora, descripcion, fecha } = req.body;
    const numeroInt = parseInt(num_bitacora, 10);

    if (isNaN(numeroInt) || numeroInt < 1) {
      return res.status(400).json({ mensaje: 'Número de bitácora inválido' });
    }

    
    const yaExiste = await Bitacora.findOne({
      where: {
        id_ficha_aprendiz,
        num_bitacora: numeroInt
      }
    });

    if (yaExiste) {
      return res.status(400).json({ mensaje: `Ya has subido la bitácora número ${numeroInt} para esta ficha.` });
    }

    // ✅ Verifica si la bitácora anterior ya fue subida (para forzar orden)
    if (numeroInt > 1) {
      const anterior = await Bitacora.findOne({
        where: {
          id_ficha_aprendiz,
          num_bitacora: numeroInt - 1
        }
      });

      if (!anterior) {
        return res.status(400).json({ mensaje: `Debes subir primero la bitácora ${numeroInt - 1}` });
      }
    }

    // ✅ Verifica si el archivo fue subido
    if (!req.file) {
      return res.status(400).json({ mensaje: 'El archivo PDF es obligatorio' });
    }

    // ✅ Cuenta cuántas bitácoras tiene ese aprendiz en esa ficha
    const total = await Bitacora.count({ where: { id_ficha_aprendiz } });
    if (total > 12) {
      return res.status(400).json({ mensaje: 'Solo puedes subir hasta 12 bitácoras para esta ficha' });
    }

    // ✅ Guarda la nueva bitácora
    const nueva = await Bitacora.create({
      id_ficha_aprendiz,
      num_bitacora: numeroInt,
      descripcion,
      fecha,
      archivo: req.file.filename,
      nombre: req.file.originalname
    });

    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear bitácora:', error);
    res.status(500).json({ mensaje: 'Error al guardar la bitácora' });
  }
};

exports.listarBitacoras = async (req, res) => {
  try {
    const { id_ficha_aprendiz } = req.params;
    const bitacoras = await Bitacora.findAll({
      where: { id_ficha_aprendiz },
      order: [['num_bitacora', 'ASC']]
    });
    res.json(bitacoras);
  } catch (err) {
    console.error('Error al listar bitácoras:', err);
    res.status(500).json({ mensaje: 'Error al listar las bitácoras' });
  }
};
exports.obtenerBitacoraPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const bitacora = await Bitacora.findByPk(id, {
      include: [
        {
          model: AprendizFicha,
          as: 'ficha_aprendiz',
        },
      ],
    });

    if (!bitacora) {
      return res.status(404).json({ mensaje: 'Bitácora no encontrada' });
    }

    res.json(bitacora);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la bitácora', error });
  }
};


exports.eliminarBitacora = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID recibido para eliminar:", id); // 👀


    const bitacora = await Bitacora.findOne({ where: { id_bitacoras: id } });

    if (!bitacora) {
      return res.status(404).json({ mensaje: 'Bitácora no encontrada' });
    }

    // Elimina archivo físico
    const filePath = path.join(__dirname, '..', 'uploads', 'bitacoras', bitacora.archivo);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await bitacora.destroy();

    res.json({ mensaje: 'Bitácora eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar bitácora:', error);
    res.status(500).json({ error: 'Error al eliminar la bitácora',error });
  }
};

exports.editarBitacora = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    const archivoNuevo = req.file?.filename;
    const nombreOriginal = req.file?.originalname;

    const bitacora = await Bitacora.findByPk(id);
    if (!bitacora) {
      return res.status(404).json({ mensaje: "Bitácora no encontrada" });
    }

    // Elimina el archivo anterior si se sube uno nuevo
    if (archivoNuevo) {
      const archivoAnteriorPath = path.join(__dirname, "..", "uploads", "bitacoras", bitacora.archivo);
      if (fs.existsSync(archivoAnteriorPath)) {
        fs.unlinkSync(archivoAnteriorPath);
      }

      bitacora.archivo = archivoNuevo;
      bitacora.nombre = nombreOriginal;
    }
    if (descripcion) {
      bitacora.descripcion = descripcion;
    }

    await bitacora.save();

    res.json({ mensaje: "Bitácora actualizada correctamente", bitacora });
  } catch (error) {
    console.error("Error al editar bitácora:", error);
    res.status(500).json({ mensaje: "Error al actualizar la bitácora" });
  }
};
