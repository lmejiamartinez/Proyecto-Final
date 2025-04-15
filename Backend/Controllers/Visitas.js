const Visita = require('../Models/Visitas');

// Crear (agendar) visita
exports.agendarVisita = async (req, res) => {
    try {
        const visita = await Visita.create(req.body);
        res.status(201).json(visita);
    } catch (error) {
        res.status(500).json({ error: 'Error al agendar visita' });
    }
};

// Obtener todas las visitas agendadas
exports.obtenerVisitas = async (req, res) => {
    try {
        const visitas = await Visita.findAll();
        res.json(visitas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener agendamientos' });
    }
};

// Actualizar visita
exports.actualizarVisita = async (req, res) => {
    try {
        const { id_visitas } = req.params;
        const [actualizado] = await Visita.update(req.body, { where: { id_visitas } });

        if (actualizado) {
            const visitaActualizada = await Visita.findByPk(id_visitas);
            res.json(visitaActualizada);
        } else {
            res.status(404).json({ error: 'Visita no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar visita', error);
        res.status(500).json({ error: 'Error al actualizar visita' });
    }
};

// Eliminar visita
exports.eliminarVisita = async (req, res) => {
    try {
        const { id_visitas } = req.params;
        const eliminado = await Visita.destroy({ where: { id_visitas } });

        if (eliminado) {
            res.json({ mensaje: 'Visita eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Visita no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar visita' });
    }
};
