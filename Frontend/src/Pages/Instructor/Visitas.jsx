import { useEffect, useState } from "react";
import {
  actualizarVisita,
  crearVisita,
  eliminarVisita,
  obtenerVisitas,
} from "../../services/VisitasService";

import VisitaCalendario from "../../Components/Visitas/VisitaCalendario";
import VisitaForm from "../../Components/Visitas/VisitaForm";
import VisitaReporte from "../../Components/Visitas/VisitaReporte";
import VisitaTabla from "../../Components/Visitas/VisitaTabla";

export default function VisitasPage() {
  const [visitas, setVisitas] = useState([]);
  const [editando, setEditando] = useState(null);

  const cargarVisitas = async () => {
    try {
      const res = await obtenerVisitas();
      setVisitas(res.data);
    } catch (error) {
      console.error("Error al cargar las visitas", error);
    }
  };

  const guardarVisita = async (data) => {
    try {
      if (editando) {
        await actualizarVisita(editando.id, data);
      } else {
        await crearVisita(data);
      }
      setEditando(null);
      cargarVisitas(); // Recargar las visitas después de guardar
    } catch (error) {
      console.error("Error al guardar la visita", error);
    }
  };

  const borrarVisita = async (id) => {
    try {
      await eliminarVisita(id);
      cargarVisitas(); // Recargar las visitas después de eliminar
    } catch (error) {
      console.error("Error al borrar la visita", error);
    }
  };

  useEffect(() => {
    cargarVisitas(); // Cargar las visitas al montar el componente
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Gestión de Visitas</h1>
      <VisitaForm onGuardar={guardarVisita} visitaActual={editando} />
      <VisitaTabla
        visitas={visitas}
        onEditar={setEditando}
        onEliminar={borrarVisita}
      />
      <VisitaCalendario visitas={visitas} />
      <VisitaReporte />
    </div>
  );
}
