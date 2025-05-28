const { Visita, AprendizFicha, Usuario } = require('../Models');

exports.solicitarVisita = async (req, res) => {
  try {
    const { id_ficha_aprendiz, titulo, motivo } = req.body;

    const nuevaVisita = await Visita.create({
      id_ficha_aprendiz,
      titulo,
      motivo,
      estado: 'Pendiente'
    });

    res.status(201).json(nuevaVisita);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear visita' });
  }
};



// ========== INSTRUCTOR ==========
exports.agendarVisita = async (req, res) => {
  try {
    const { id_visitas, id_instructor, tipo, hora_inicio, hora_fin } = req.body;

    // Validar traslape (franja ya ocupada)
    const visitasTraslapadas = await Visita.findOne({
      where: {
        id_instructor,
        [Op.or]: [
          {
            hora_inicio: { [Op.between]: [hora_inicio, hora_fin] }
          },
          {
            hora_fin: { [Op.between]: [hora_inicio, hora_fin] }
          }
        ]
      }
    });

    if (visitasTraslapadas) {
      return res.status(400).json({ mensaje: 'Ya hay una visita agendada en este rango de tiempo' });
    }

    // Agendar (actualizar)
    const visita = await Visita.findByPk(id_visitas);
    if (!visita) return res.status(404).json({ mensaje: 'Visita no encontrada' });

    visita.set({ id_instructor, tipo, hora_inicio, hora_fin, estado: 'Aprobada' });
    await visita.save();

    res.json({ mensaje: 'Visita agendada correctamente', visita });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agendar visita', error });
  }
};

exports.visualizarVisitas = async (req, res) => {
  try {
    const visitas = await Visita.findAll({
      include: [
        { model: AprendizFicha, as: 'aprendiz_ficha' },
        { model: Usuario, as: 'instructor' }
      ]
    });
    res.json(visitas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener visitas', error });
  }
};

exports.modificarVisita = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevaData = req.body;

    const visita = await Visita.findByPk(id);
    if (!visita) return res.status(404).json({ mensaje: 'Visita no encontrada' });

    await visita.update(nuevaData);
    res.json({ mensaje: 'Visita modificada', visita });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al modificar visita', error });
  }
};

exports.eliminarVisita = async (req, res) => {
  try {
    const { id } = req.params;
    const visita = await Visita.findByPk(id);
    if (!visita) return res.status(404).json({ mensaje: 'Visita no encontrada' });

    await visita.destroy();
    res.json({ mensaje: 'Visita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar visita', error });
  }
};

exports.reporteVisitas = async (req, res) => {
  try {
    const visitas = await Visita.findAll({
      where: { estado: 'Aprobada' },
      include: [
        { model: AprendizFicha, as: 'aprendiz_ficha' },
        { model: Usuario, as: 'instructor' }
      ]
    });
    res.json(visitas); // Esto se puede pasar a generación de PDF o Excel en otro servicio
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar reporte', error });
  }
};

exports.reporteAprendicesSinVisita = async (req, res) => {
  try {
    // Aquí deberías tener las fechas de etapa productiva en `AprendizFicha` para comparar
    // Este código es base, hay que ajustarlo según campos y lógica real
    const aprendicesSinVisita = await AprendizFicha.findAll({
      include: [
        {
          model: Visita,
          as: 'visitas',
          required: false
        }
      ]
    });

    const resultado = aprendicesSinVisita.filter(a => {
      if (!a.visitas || a.visitas.length === 0) return true;
      const ultima = a.visitas[a.visitas.length - 1];
      const dosMeses = 1000 * 60 * 60 * 24 * 60;
      return new Date() - new Date(ultima.fecha) > dosMeses;
    });

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el reporte de alerta', error });
  }
};

