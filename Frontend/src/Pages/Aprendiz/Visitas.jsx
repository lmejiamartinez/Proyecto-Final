import axios from "axios";
import React, { useEffect, useState } from "react";

const SolicitarVisita = () => {
  const [infoAprendiz, setInfoAprendiz] = useState(null);
  const [fecha, setFecha] = useState("");
  const [motivo, setMotivo] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchDatosAprendiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/usuarios/datos-aprendiz", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInfoAprendiz(res.data);
      } catch (error) {
        console.error("Error al cargar datos del aprendiz:", error);
      }
    };

    fetchDatosAprendiz();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fecha || !motivo || !infoAprendiz?.id_ficha_aprendiz) {
      return setMensaje("Todos los campos son obligatorios");
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/visitas/",
        {
          id_ficha_aprendiz: infoAprendiz.id_ficha_aprendiz,
          fecha,
          motivo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMensaje("Visita solicitada exitosamente");
      setFecha("");
      setMotivo("");
    } catch (error) {
      console.error("Error al solicitar visita:", error);
      setMensaje("Error al solicitar la visita");
    }
  };

  if (!infoAprendiz) return <p>Cargando datos del aprendiz...</p>;

  return (
    <div>
      <h2>Solicitar Visita</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={infoAprendiz.nombre} disabled />
        </div>
        <div>
          <label>Ficha:</label>
          <input type="text" value={infoAprendiz.numero_ficha} disabled />
        </div>
        <div>
          <label>Programa de Formación:</label>
          <input type="text" value={infoAprendiz.programa_formacion} disabled />
        </div>
        <div>
          <label>Fecha de la visita:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Motivo:</label>
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Solicitar Visita</button>
      </form>
    </div>
  );
};

export default SolicitarVisita;
