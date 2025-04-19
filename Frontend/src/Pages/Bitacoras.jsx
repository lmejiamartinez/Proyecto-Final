import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Importa uuidv4 si no lo has hecho

const Bitacoras = () => {
  const [seguimientos, setSeguimientos] = useState([]);
  const [seguimientoBitacora, setSeguimientoBitacora] = useState({
    // Inicialización sin aprendizId
    numeroBitacora: "",
    estadoBitacora: "no_entregada",
    actividades: "",
    observaciones: "",
    evidencias: "",
    fecha: new Date().toLocaleDateString(),
    chequeoActividadesEvidencias: [],
    valoracion: "",
    aprendizId: "", // Inicializamos aprendizId como string vacío
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idSeguimientoAEditar, setIdSeguimientoAEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState("");
  const [aprendices, setAprendices] = useState([
    { id: "1", nombre: "Aprendiz 1" },
    { id: "2", nombre: "Aprendiz 2" },
    { id: "3", nombre: "Aprendiz 3" },
  ]);

  useEffect(() => {
    setSeguimientos([
      {
        id: "101",
        numeroBitacora: "BIT001",
        estadoBitacora: "entregada",
        actividades: "Actividad 1 realizada",
        observaciones: "Sin observaciones",
        evidencias: "Archivo adjunto 1",
        fecha: "17/04/2025",
        chequeoActividadesEvidencias: [],
        valoracion: "Cumple",
        aprendizId: "1",
      },
      {
        id: "102",
        numeroBitacora: "BIT002",
        estadoBitacora: "no_entregada",
        actividades: "Planificación de la siguiente actividad",
        observaciones: "Necesita revisión",
        evidencias: "Borrador del plan",
        fecha: "18/04/2025",
        chequeoActividadesEvidencias: [],
        valoracion: "En revisión",
        aprendizId: "2",
      },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeguimientoBitacora((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEdicion && idSeguimientoAEditar) {
      const nuevosSeguimientos = seguimientos.map((seguimiento) =>
        seguimiento.id === idSeguimientoAEditar
          ? seguimientoBitacora
          : seguimiento
      );
      setSeguimientos(nuevosSeguimientos);
      setModoEdicion(false);
      setIdSeguimientoAEditar(null);
      setMostrarFormulario(false);
      alert("Seguimiento de bitácora actualizado!");
    } else {
      const nuevoSeguimiento = {
        ...seguimientoBitacora,
        id: uuidv4(),
        aprendizId: aprendizSeleccionado,
      }; // Asigna aprendizId aquí
      setSeguimientos([...seguimientos, nuevoSeguimiento]);
      setMostrarFormulario(false);
      alert("Seguimiento de bitácora creado!");
    }
    setSeguimientoBitacora({
      // Resetea el formulario con aprendizId vacío
      numeroBitacora: "",
      estadoBitacora: "no_entregada",
      actividades: "",
      observaciones: "",
      evidencias: "",
      fecha: new Date().toLocaleDateString(),
      chequeoActividadesEvidencias: [],
      valoracion: "",
      aprendizId: "",
    });
  };

  const handleNuevoSeguimiento = () => {
    setModoEdicion(false);
    setIdSeguimientoAEditar(null);
    setSeguimientoBitacora({
      // Resetea el formulario con aprendizId vacío
      numeroBitacora: "",
      estadoBitacora: "no_entregada",
      actividades: "",
      observaciones: "",
      evidencias: "",
      fecha: new Date().toLocaleDateString(),
      chequeoActividadesEvidencias: [],
      valoracion: "",
      aprendizId: aprendizSeleccionado, // Asigna el aprendiz seleccionado al crear nuevo
    });
    setMostrarFormulario(true);
  };

  const handleVisualizarSeguimiento = (id) => {
    const seguimiento = seguimientos.find((s) => s.id === id);
    if (seguimiento) {
      setSeguimientoBitacora(seguimiento);
      setMostrarFormulario(true);
      setModoEdicion(false);
    }
  };

  const handleEditarSeguimiento = (id) => {
    const seguimiento = seguimientos.find((s) => s.id === id);
    if (seguimiento) {
      setSeguimientoBitacora(seguimiento);
      setModoEdicion(true);
      setIdSeguimientoAEditar(id);
      setMostrarFormulario(true);
    }
  };

  const handleEliminarSeguimiento = (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este seguimiento?")
    ) {
      const nuevosSeguimientos = seguimientos.filter(
        (seguimiento) => seguimiento.id !== id
      );
      setSeguimientos(nuevosSeguimientos);
      alert("Seguimiento de bitácora eliminado!");
    }
  };

  const handleFiltrarPorAprendiz = (e) => {
    setAprendizSeleccionado(e.target.value);
  };

  const seguimientosFiltrados = aprendizSeleccionado
    ? seguimientos.filter((s) => s.aprendizId === aprendizSeleccionado)
    : seguimientos;

  return (
    <div>
      <h2>Seguimiento de Bitácoras</h2>

      <button className="btn btn-success mb-3" onClick={handleNuevoSeguimiento}>
        Crear Nuevo Seguimiento
      </button>

      {mostrarFormulario && (
        <div className="mt-3">
          <h3>
            {modoEdicion
              ? "Editar Seguimiento"
              : "Visualizar/Crear Seguimiento"}
          </h3>
          <form onSubmit={handleSubmit}>
            {/* ... el resto del formulario ... */}
            <div className="mb-3">
              <label htmlFor="aprendizId" className="form-label">
                Aprendiz:
              </label>
              <select
                className="form-select"
                id="aprendizId"
                name="aprendizId"
                value={seguimientoBitacora.aprendizId}
                onChange={handleChange}
                disabled={!modoEdicion}
              >
                <option value="">Seleccionar Aprendiz</option>
                {aprendices.map((aprendiz) => (
                  <option key={aprendiz.id} value={aprendiz.id}>
                    {aprendiz.nombre}
                  </option>
                ))}
              </select>
            </div>
            {modoEdicion ? (
              <button type="submit" className="btn btn-primary me-2">
                Guardar Cambios
              </button>
            ) : (
              <button type="submit" className="btn btn-primary me-2">
                Guardar Seguimiento
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      <div className="mt-4">
        <h2>Listado de Seguimientos</h2>

        <div className="mb-3">
          <label htmlFor="aprendiz" className="form-label">
            Filtrar por Aprendiz:
          </label>
          <select
            className="form-select"
            id="aprendiz"
            value={aprendizSeleccionado}
            onChange={handleFiltrarPorAprendiz}
          >
            <option value="">Todos los aprendices</option>
            {aprendices.map((aprendiz) => (
              <option key={aprendiz.id} value={aprendiz.id}>
                {aprendiz.nombre}
              </option>
            ))}
          </select>
        </div>

        {seguimientosFiltrados.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Aprendiz</th> {/* Nueva columna para el aprendiz */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {seguimientosFiltrados.map((seguimiento) => (
                <tr key={seguimiento.id}>
                  <td>{seguimiento.numeroBitacora}</td>
                  <td>{seguimiento.estadoBitacora}</td>
                  <td>{seguimiento.fecha}</td>
                  <td>
                    {aprendices.find(
                      (aprendiz) => aprendiz.id === seguimiento.aprendizId
                    )?.nombre || "Sin Asignar"}
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() =>
                        handleVisualizarSeguimiento(seguimiento.id)
                      }
                    >
                      <i className="bi bi-eye"></i> Visualizar
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditarSeguimiento(seguimiento.id)}
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminarSeguimiento(seguimiento.id)}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay seguimientos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Bitacoras;
