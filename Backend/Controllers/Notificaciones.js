// controllers/notificaciones.controller.js

const { Notificaciones, Usuarios } = require('../Models');

// 🟢 Crear una nueva notificación
exports.crearNotificacion = async (req, res) => {
  try {
    const { id_usuario, titulo, mensaje, categoria } = req.body;

    const nueva = await Notificaciones.create({
      id_usuario,
      titulo,
      mensaje,
      categoria,
      estado: 'no_leida',
      fecha: new Date()
    });

    res.status(201).json({ mensaje: 'Notificación creada', notificacion: nueva });
  } catch (error) {
    console.error('Error al crear notificación:', error);
    res.status(500).json({ error: 'Error al crear la notificación' });
  }
};

// 🟡 Obtener notificaciones de un usuario (por ID)
exports.obtenerNotificaciones = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const notificaciones = await Notificaciones.findAll({
      where: { id_usuario },
      order: [['fecha', 'DESC']],
    });

    res.json(notificaciones);
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    res.status(500).json({ error: 'Error al obtener las notificaciones' });
  }
};

// 🟣 Marcar notificación como leída
exports.marcarComoLeida = async (req, res) => {
  try {
    const { id } = req.params;

    const notificacion = await Notificaciones.findByPk(id);

    if (!notificacion) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    notificacion.estado = 'leida';
    await notificacion.save();

    res.json({ mensaje: 'Notificación marcada como leída' });
  } catch (error) {
    console.error('Error al marcar como leída:', error);
    res.status(500).json({ error: 'Error al actualizar notificación' });
  }
};

// 🔴 Eliminar notificación (opcional)
exports.eliminarNotificacion = async (req, res) => {
  try {
    const { id } = req.params;

    const notificacion = await Notificaciones.findByPk(id);

    if (!notificacion) {
      return res.status(404).json({ error: 'No encontrada' });
    }

    await notificacion.destroy();

    res.json({ mensaje: 'Notificación eliminada' });
  } catch (error) {
    console.error('Error al eliminar notificación:', error);
    res.status(500).json({ error: 'Error al eliminar la notificación' });
  }
};
exports.marcarTodasComoLeidas = async (req, res) => {
    try {
      const { id_usuario } = req.params;
  
      await Notificaciones.update(
        { estado: 'leida' },
        { where: { id_usuario } }
      );
  
      res.json({ mensaje: 'Todas las notificaciones marcadas como leídas' });
    } catch (error) {
      console.error('Error al marcar todas como leídas:', error);
      res.status(500).json({ error: 'Error al actualizar notificaciones' });
    }
  };
  exports.contarNoLeidas = async (req, res) => {
    try {
      const { id_usuario } = req.params;
  
      const total = await Notificaciones.count({
        where: { id_usuario, estado: 'no leida' }
      });
  
      res.json({ noLeidas: total });
    } catch (error) {
      console.error('Error al contar no leídas:', error);
      res.status(500).json({ error: 'Error al contar notificaciones' });
    }
  };
  