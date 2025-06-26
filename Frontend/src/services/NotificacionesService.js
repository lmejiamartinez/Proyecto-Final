import axios from 'axios';

const API_URL = 'http://localhost:3001/api/notificaciones';

const crearNotificacion = (datos) => axios.post(`${API_URL}`, datos);
const obtenerNotificaciones = (id_usuario) => axios.get(`${API_URL}/${id_usuario}`);
const marcarComoLeida = (id) => axios.put(`${API_URL}/${id}/marcar-leida`);
const marcarTodasComoLeidas = (id_usuario) => axios.patch(`${API_URL}/marcar-todas/${id_usuario}`);
const contarNoLeidas = (id_usuario) => axios.get(`${API_URL}/contador/no-leidas/${id_usuario}`);
const eliminarNotificacion = (id) => axios.delete(`${API_URL}/${id}`);

export default {
    crearNotificacion,
    obtenerNotificaciones,
    marcarComoLeida,
    marcarTodasComoLeidas,
    contarNoLeidas,
    eliminarNotificacion
};
