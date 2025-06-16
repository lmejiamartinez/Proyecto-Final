const { AprendizFicha, Usuario, Ficha, Sequelize } = require('../Models'); // Importa Sequelize

exports.buscarPorUsuario = async (req, res) => {
  try {
    const ficha_aprendiz = await AprendizFicha.findOne({
      where: { id_usuario: req.params.id_usuario },
      attributes: ['id_ficha_aprendiz'], // IMPORTANTE
      include: [
        {
          model: Usuario,
          as: 'aprendiz',
          attributes: ['nombre'],
        },
        {
          model: Ficha,
          as: 'ficha',
          attributes: ['termino', 'num_programa', 'id_ficha'],
        },
      ],
    });

    if (!ficha_aprendiz) return res.status(404).json({ error: 'Ficha no encontrada' });

    const info_ficha_aprendiz = {
      id_ficha_aprendiz: ficha_aprendiz.id_ficha_aprendiz, // Te aseguras que no falte
      ...ficha_aprendiz.aprendiz.toJSON(),
      ...ficha_aprendiz.ficha.toJSON(),
    };

    res.json(info_ficha_aprendiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar ficha' });
  }
};


exports.obtenerTodos = async (req, res) => {
  try {
    const visitas = await Visita.findAll({
      include: [
        {
          model: AprendizFicha,
          as: 'aprendiz_ficha',
          include: [
            {
              model: Usuario,
              as: 'aprendiz',
              attributes: ['nombre', 'correo'],
            },
            {
              model: sequelize.models.Ficha,
              as: 'ficha',
              attributes: ['num_programa', 'termino'],
            },
          ],
        },
        {
          model: Usuario,
          as: 'instructor',
          attributes: ['nombre', 'correo'],
        },
      ],
    });
    res.json(visitas);
  } catch (error) {
    console.error('Error al obtener agendamientos:', error);
    res.status(500).json({ error: 'Error al obtener agendamientos' });
  }
};

exports.obtenerPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const aprendizFicha = await AprendizFicha.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'aprendiz',
          attributes: ['id_usuario', 'nombre', 'rol', 'email'],
          where: {
            rol: 'aprendiz',
          },
          required: true,
        },
        {
          model: Ficha,
          as: 'ficha',
          attributes: ['id_ficha', 'nombre_ficha', 'codigo_programa'],
        },
      ],
    });

    if (aprendizFicha) {
      res.status(200).json(aprendizFicha);
    } else {
      res
        .status(404)
        .json({ error: 'Registro de AprendizFicha no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener AprendizFicha por ID:', error);
    res
      .status(500)
      .json({ error: 'Error al obtener el registro de AprendizFicha.' });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevoAprendizFicha = await AprendizFicha.create(req.body);
    res.status(201).json(nuevoAprendizFicha);
  } catch (error) {
    console.error('Error al crear AprendizFicha:', error);
    res
      .status(500)
      .json({ error: 'Error al crear el registro de AprendizFicha.' });
  }
};

exports.actualizar = async (req, res) => {
  const { id } = req.params;
  try {
    const [filasActualizadas] = await AprendizFicha.update(req.body, {
      where: { id_ficha_aprendiz: id },
    });

    if (filasActualizadas > 0) {
      const aprendizFichaActualizado = await AprendizFicha.findByPk(id, {
        include: [
          {
            model: Usuario,
            as: 'aprendiz',
            attributes: ['id_usuario', 'nombre', 'rol', 'email'],
            where: {
              rol: 'aprendiz',
            },
            required: true,
          },
          {
            model: Ficha,
            as: 'ficha',
            attributes: ['id_ficha', 'nombre_ficha', 'codigo_programa'],
          },
        ],
      });
      res.status(200).json(aprendizFichaActualizado);
    } else {
      res
        .status(404)
        .json({ error: 'Registro de AprendizFicha no encontrado.' });
    }
  } catch (error) {
    console.error('Error al actualizar AprendizFicha:', error);
    res
      .status(500)
      .json({ error: 'Error al actualizar el registro de AprendizFicha.' });
  }
};

exports.eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    const filasEliminadas = await AprendizFicha.destroy({
      where: { id_ficha_aprendiz: id },
    });

    if (filasEliminadas > 0) {
      res.status(204).send();
    } else {
      res
        .status(404)
        .json({ error: 'Registro de AprendizFicha no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar AprendizFicha:', error);
    res
      .status(500)
      .json({ error: 'Error al eliminar el registro de AprendizFicha.' });
  }
};

// exports.obtenerFichasPorAprendiz = async (req, res) => {
//   const { idaprendiz } = req.params;
//   try {
//     // Encontrar todas las AprendizFicha asociadas con el id_usuario
//     const aprendizFichaRaw = await AprendizFicha.findAll({
//       where: { id_usuario: idaprendiz },
//       attributes: ['id_ficha_aprendiz'],
//       include: [
//         {
//           model: Ficha,
//           as: 'ficha', // Aquí usas el alias correcto definido en la relación del modelo AprendizFicha
//           attributes: [
//             'id_ficha',
//             'num_programa',
//             'termino',
//             'id_instructor',
//             'nombre',
//           ], // Solo los atributos que necesitas
//           raw: true, // Optimiza la consulta para obtener un resultado plano
//           nest: true, // Anida los resultados del include
//         },
//       ],
//     });

//     if (!aprendizFichaRaw || aprendizFichaRaw.length === 0) {
//       return res
//         .status(404)
//         .json({ error: 'Registro de AprendizFicha no encontrado.' });
//     }

//     const aprendizFicha = aprendizFichaRaw.map((aprendiz) => {
//       // Retornamos directamente los atributos de 'ficha'
//       return {
//         id_ficha: aprendiz.ficha.id_ficha,
//         num_programa: aprendiz.ficha.num_programa,
//         termino: aprendiz.ficha.termino,
//         id_instructor: aprendiz.ficha.id_instructor,
//         nombre: aprendiz.ficha.nombre,
//       };
//     });

//     return res.status(200).json(aprendizFicha); // Retornamos los resultados encontrados
//   } catch (error) {
//     console.error('Error al obtener AprendizFicha por ID:', error);
//     return res
//       .status(500)
//       .json({ error: 'Error al obtener el registro de AprendizFicha.', error });
//   }
// };
exports.obtenerFichasPorAprendiz = async (req, res) => {
  const { idaprendiz } = req.params;
  try {
    const aprendizFichaRaw = await AprendizFicha.findAll({
      where: { id_usuario: idaprendiz },
      // 1. PEDIMOS EL ID QUE NECESITAMOS
      attributes: ['id_ficha_aprendiz'],
      include: [
        {
          model: Ficha,
          as: 'ficha',
          attributes: ['id_ficha', 'num_programa', 'termino', 'nombre'],
        },
      ],
      raw: true, // Optimiza la consulta para obtener un resultado plano
      nest: true, // Anida los resultados del include
    });

    if (!aprendizFichaRaw || aprendizFichaRaw.length === 0) {
      return res.status(200).json([]); // Devuelve array vacío si no hay fichas
    }
    
    // 2. TRANSFORMAMOS LA RESPUESTA PARA QUE SEA MÁS FÁCIL DE USAR EN REACT
    const fichasPlanificadas = aprendizFichaRaw.map(af => ({
        id_ficha_aprendiz: af.id_ficha_aprendiz, // <-- ¡LA CLAVE ESTÁ AQUÍ!
        id_ficha: af.ficha.id_ficha,
        num_programa: af.ficha.num_programa,
        termino: af.ficha.termino,
        nombre: af.ficha.nombre,
    }));

    return res.status(200).json(fichasPlanificadas);
  } catch (error) {
    console.error('Error al obtener las fichas del aprendiz:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

exports.obtenerFichaAprendiz = async (req, res) => {
  const { idaprendiz, idficha } = req.params;
  try {
    const aprendizFichaRaw = await AprendizFicha.findOne({
      where: { id_usuario: idaprendiz, id_ficha: idficha },
      attributes: ['id_ficha_aprendiz'],
      include: [
        {
          model: Ficha,
          as: 'ficha',
          attributes: ['id_ficha', 'num_programa', 'termino', 'id_instructor', 'nombre'],
        },
        {
          model: Usuario,
          as: 'aprendiz',
          attributes:['nombre']
        },
      ],
    });

    // Mal error check
    if (!aprendizFichaRaw) {  // ESTO NO FUNCIONA, porque no es array, pon: if (!aprendizFichaRaw)
      return res.status(404).json({ error: 'Registro de AprendizFicha no encontrado.' });
    }

    // Si la relación no existe, esto dará error
    const aprendizFicha = {
      id_ficha_aprendiz : aprendizFichaRaw.id_ficha_aprendiz,
      ...aprendizFichaRaw.ficha.toJSON(),
      ...aprendizFichaRaw.aprendiz.toJSON(),
    };

    return res.status(200).json(aprendizFicha);
  } catch (error) {
    console.error('Error al obtener AprendizFicha por ID:', error);
    return res.status(500).json({ message: 'Error al obtener el registro de AprendizFicha.', error: error.message });
  }
};
