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
    const res = await obtenerVisitas();
    setVisitas(res.data);
  };

  const guardarVisita = async (data) => {
    if (editando) {
      await actualizarVisita(editando.id, data);
    } else {
      await crearVisita(data);
    }
    setEditando(null);
    cargarVisitas();
  };

  const borrarVisita = async (id) => {
    await eliminarVisita(id);
    cargarVisitas();
  };

  useEffect(() => {
    cargarVisitas();
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
