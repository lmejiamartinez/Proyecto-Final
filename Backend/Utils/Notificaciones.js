// utils/notificaciones.util.js
const { Notificaciones } = require('../Models');

const crearNotificacionInterna = async ({ id_usuario, titulo, mensaje, categoria }) => {
    try {
        await Notificaciones.create({
            id_usuario,
            titulo,
            mensaje,
            categoria,
            estado: 'no_leida',
            fecha: new Date()
        });
    } catch (error) {
        console.error('❌ Error al crear notificación interna:', error.message);
    }
};

module.exports = { crearNotificacionInterna };
