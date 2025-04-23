import { apiClientAxios } from "../services/Axios"; // Asegúrate de que el path sea correcto

export const obtenerVisitas = () => apiClientAxios.get("/visitas");

export const crearVisita = (visita) => apiClientAxios.post("/visitas", visita);

export const actualizarVisita = (id, visita) => apiClientAxios.put(`/visitas/${id}`, visita);

export const eliminarVisita = (id) => apiClientAxios.delete(`/visitas/${id}`);

export const exportarPDF = () => apiClientAxios.get("/visitas/reporte/pdf", { responseType: "blob" });

export const exportarExcel = () => apiClientAxios.get("/visitas/reporte/excel", { responseType: "blob" });
