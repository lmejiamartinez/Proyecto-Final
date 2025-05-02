const express = require('express');
const router = express.Router();
const NotificacionesController = require('../Controllers/Notificaciones');

router.post('/', NotificacionesController.crearNotificacion);
router.get('/:id_usuario', NotificacionesController.obtenerNotificaciones);
router.put('/:id/marcar-leida', NotificacionesController.marcarComoLeida);
router.delete('/:id', NotificacionesController.eliminarNotificacion); // opcional
router.patch('/marcar-todas/:id_usuario',  NotificacionesController.marcarTodasComoLeidas);
router.get('/contador/no-leidas/:id_usuario',  NotificacionesController.contarNoLeidas);

module.exports = router;
