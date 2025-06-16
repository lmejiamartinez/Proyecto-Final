import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Visitas = () => {
  const { idUsuario, loading } = useAuth();
  const { idFicha: id_ficha } = useParams();

  const [fichaaprendiz, setfichaaprendiz] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    motivo: "",
  });

  const [visitas, setVisitas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idVisitaEditando, setIdVisitaEditando] = useState(null);

  useEffect(() => {
    if (!idUsuario) return;

    const obtenerFicha = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/aprendizFicha/aprendiz/${idUsuario}/ficha/${id_ficha}`
        );
        console.log("Datos que llegan de la ficha:", data);
        setfichaaprendiz(data);
      } catch (err) {
        console.error("Error al obtener ficha del aprendiz", err);
      }
    };

    obtenerFicha();
  }, [idUsuario, id_ficha]);

  useEffect(() => {
    const obtenerVisitas = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/visitas/aprendiz/${idUsuario}/ficha/${id_ficha}`
        );
        setVisitas(res.data);
      } catch (err) {
        console.error("Error al obtener visitas del aprendiz", err);
      }
    };
    if (fichaaprendiz) {
      obtenerVisitas();
    }
  }, [idUsuario, fichaaprendiz]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id_ficha_aprendiz } = fichaaprendiz;
      if (modoEdicion) {
        await axios.put(
          `http://localhost:3001/api/visitas/${idVisitaEditando}`,
          form
        );
        alert("Visita actualizada con éxito");
        setModoEdicion(false);
        setIdVisitaEditando(null);
      } else {
        console.log({ id_ficha_aprendiz, ...form });
        await axios.post("http://localhost:3001/api/visitas", {
          id_ficha_aprendiz,
          ...form,
        });
        alert("Visita solicitada con éxito");
      }

      setForm({ titulo: "", motivo: "" });
      const { data } = await axios.get(
        `http://localhost:3001/api/visitas/aprendiz/${idUsuario}/ficha/${id_ficha}`
      );
      setVisitas(data);
    } catch (err) {
      console.error(err);
      alert("Error al enviar el formulario");
    }
  };

  const handleEditar = (visita) => {
    setModoEdicion(true);
    setIdVisitaEditando(visita.id_visitas);
    setForm({ titulo: visita.titulo, motivo: visita.motivo });
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta visita?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/visitas/${id}`);
      setVisitas(visitas.filter((v) => v.id_visitas !== id));
    } catch (err) {
      console.error("Error al eliminar visita", err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!idUsuario) return <p>Debes iniciar sesión</p>;

  console.log(fichaaprendiz);
  return (
    <div className="container mt-4">
      <h2>{modoEdicion ? "Editar Visita" : "Solicitar Visita"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre del aprendiz</label>
          <input
            type="text"
            className="form-control"
            value={fichaaprendiz?.nombre}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Número de ficha</label>
          <input
            type="text"
            className="form-control"
            value={fichaaprendiz?.num_programa}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Fecha actual</label>
          <input
            type="text"
            className="form-control"
            value={new Date().toLocaleDateString()}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Programa</label>
          <input
            type="text"
            className="form-control"
            value={fichaaprendiz?.termino}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            className="form-control"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Motivo</label>
          <textarea
            name="motivo"
            className="form-control"
            value={form.motivo}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!fichaaprendiz?.id_ficha_aprendiz}
        >
          {modoEdicion ? "Guardar cambios" : "Enviar solicitud"}
        </button>
      </form>

      <h3 className="mt-4">Mis Solicitudes</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Título</th>
            <th>Nombre</th>
            <th>Número de ficha</th>
            <th>Programa</th>
            <th>Fecha creación</th>
            <th>Motivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(visitas) &&
            visitas.length > 0 &&
            visitas.map((visita) => (
              <tr key={visita.id_visitas}>
                <td>{visita.titulo}</td>
                <td>{fichaaprendiz?.nombre}</td>
                <td>{fichaaprendiz?.num_programa}</td>
                <td>{fichaaprendiz?.termino}</td>
                <td>{new Date(visita.createdAt).toLocaleDateString()}</td>
                <td>{visita.motivo}</td>
                <td>
                  <button
                    onClick={() => handleEditar(visita)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(visita.id_visitas)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Visitas;
