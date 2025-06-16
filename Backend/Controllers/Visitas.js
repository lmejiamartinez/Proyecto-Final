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
    console.error("Detalles del error:", err.response?.data || err.message);
    alert("Error al enviar el formulario: " + (err.response?.data?.message || "Error desconocido"));
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


exports.eliminarVisita = async (req, res) => {
  const { id } = req.params;

  try {
    const visita = await Visita.findByPk(id);

    if (!visita) {
      return res.status(404).json({ mensaje: "Visita no encontrada" });
    }

    await visita.destroy();
    res.json({ mensaje: "Visita eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar visita" });
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

exports.visitasPorAprendiz = async (req, res) => {
  try {
    const { id, id_ficha } = req.params;

    const visitas = await AprendizFicha.findOne({
      where: { id_usuario: id, id_ficha },
      attributes: ['id_ficha_aprendiz'],
      include: [{
        model: Visita,
        as: 'visitas',
      }],
    });

    if (!visitas) {
      return res.status(404).json({ mensaje: 'Ficha de aprendiz no encontrada' });
    }
    const visitasTransformadas = visitas.visitas.map((item) => ({
      ...item.toJSON(),

    }))

    res.json(visitasTransformadas);

  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al obtener visitas del aprendiz', error });
  }
};

exports.editarVisita = async (req, res) => {
  const { id } = req.params;
  const { titulo, motivo } = req.body;

  try {
    const visita = await Visita.findByPk(id);

    if (!visita) {
      return res.status(404).json({ mensaje: "Visita no encontrada" });
    }

    visita.titulo = titulo;
    visita.motivo = motivo;
    await visita.save();

    res.json({ mensaje: "Visita actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar visita" });
  }
};