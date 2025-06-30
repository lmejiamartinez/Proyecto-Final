// controllers/ficha.controller.js
const { Visita, AprendizFicha, Ficha } = require('../Models');

//listar fichas

exports.listarFichas = async (req, res) => {
  try {


    const idInstructor = req.usuario.idUsuario;

    const fichas = await Ficha.findAll({
      where: { id_instructor: idInstructor }
    });

    res.json(fichas);
  } catch (error) {
    console.error('Error al obtener fichas del instructor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
//Llamar ficha por numero de programa
exports.listarFichasNum = async (req, res) => {
  try {
    const { num_programa } = req.query;

    // Si se proporciona el num_programa, filtrar las fichas por ese valor
    const filtros = num_programa ? { where: { num_programa } } : {};

    const fichas = await Ficha.findAll(filtros);
    res.json(fichas);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las fichas' });
  }
};

//Crear ficha
exports.crearFicha = async (req, res) => {
  try {
    const { num_programa, termino, fecha_inicio, fecha_fin, nombre, id_instructor } = req.body;

    if (!id_instructor) {
      return res.status(400).json({ error: "El campo id_instructor es obligatorio" });
    }

    const ficha = await Ficha.create({
      num_programa,
      termino,
      nombre,
      fecha_inicio,
      fecha_fin,
      id_instructor,
    });

    res.status(201).json(ficha);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: "Ya existe una ficha con ese número de programa. Debe ser único.",
      });
    }

    console.error("Error detallado al crear ficha:", error);
    res.status(500).json({ error: "Error al crear la ficha", detalle: error.message });
  }
};


//Eliminar ficha
exports.eliminarFicha = async (req, res) => {
  const { id } = req.params;

  try {
    const ficha = await Ficha.findByPk(id);

    if (!ficha) {
      return res.status(404).json({ mensaje: "Ficha no encontrada" });
    }

    await ficha.destroy();
    res.status(200).json({ mensaje: "Ficha eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar ficha:", error);
    res.status(500).json({ error: "Error al eliminar la ficha", detalle: error.message });
  }
};
