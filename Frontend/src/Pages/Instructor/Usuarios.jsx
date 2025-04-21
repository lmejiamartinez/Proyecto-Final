import {
  faEdit,
  faList,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const GestionUsuarios = () => {
  const [aprendices, setAprendices] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Simulación de carga de todos los aprendices desde el backend
    const cargarAprendices = async () => {
      // Reemplaza esto con tu llamada real a la API
      setTimeout(() => {
        setAprendices([
          {
            id: 1,
            nombre: "Aprendiz Uno",
            identificacion: "12345",
            correo: "uno@ejemplo.com",
            programa: "ADSI",
          },
          {
            id: 2,
            nombre: "Aprendiz Dos",
            identificacion: "67890",
            correo: "dos@ejemplo.com",
            programa: "Diseño",
          },
          {
            id: 3,
            nombre: "Aprendiz Tres",
            identificacion: "13579",
            correo: "tres@ejemplo.com",
            programa: "ADSI",
          },
        ]);
      }, 750);
    };

    cargarAprendices();
  }, []);

  const handleBuscarAprendiz = (event) => {
    setBusqueda(event.target.value);
  };

  const aprendicesFiltrados = aprendices.filter(
    (aprendiz) =>
      aprendiz.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      aprendiz.identificacion.includes(busqueda)
  );

  const handleVisualizarAprendiz = (aprendiz) => {
    setAprendizSeleccionado(aprendiz);
    setModoEdicion(false);
    setFormData({ ...aprendiz });
  };

  const handleEditarAprendiz = (aprendiz) => {
    setAprendizSeleccionado(aprendiz);
    setModoEdicion(true);
    setFormData({ ...aprendiz });
  };

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardarCambios = async () => {
    // Aquí deberías enviar 'formData' al backend para actualizar la información del aprendiz con ID 'aprendizSeleccionado.id'
    console.log("Guardando cambios del aprendiz:", formData);
    // Simulación de guardado exitoso
    const nuevosAprendices = aprendices.map((aprendiz) =>
      aprendiz.id === formData.id ? formData : aprendiz
    );
    setAprendices(nuevosAprendices);
    setModoEdicion(false);
    setAprendizSeleccionado(formData);
    alert("Datos del aprendiz actualizados exitosamente (simulado)");
  };

  const handleCancelarEdicion = () => {
    setModoEdicion(false);
    setFormData({ ...aprendizSeleccionado });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Usuarios (Aprendices)</h2>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          {/* Buscar Usuarios */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="text-center mb-3">
                <FontAwesomeIcon icon={faSearch} className="me-2" /> Buscar
                Aprendiz
              </h3>
              <div className="mb-3">
                <label htmlFor="busqueda" className="form-label">
                  Número de Identificación o Nombre:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="busqueda"
                  value={busqueda}
                  onChange={handleBuscarAprendiz}
                  placeholder="Ingrese número de identificación o nombre"
                />
              </div>
            </div>
          </div>

          {/* Listar Aprendices */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="text-center mb-3">
                <FontAwesomeIcon icon={faList} className="me-2" /> Lista de
                Aprendices
              </h3>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Identificación</th>
                      <th>Correo Electrónico</th>
                      <th>Programa de Formación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aprendicesFiltrados.map((aprendiz) => (
                      <tr key={aprendiz.id}>
                        <td>{aprendiz.id}</td>
                        <td>{aprendiz.nombre}</td>
                        <td>{aprendiz.identificacion}</td>
                        <td>{aprendiz.correo}</td>
                        <td>{aprendiz.programa}</td>
                        <td>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => handleVisualizarAprendiz(aprendiz)}
                          >
                            <FontAwesomeIcon icon={faUser} /> Ver
                          </button>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleEditarAprendiz(aprendiz)}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {aprendicesFiltrados.length === 0 && (
                <p className="text-center mt-2">
                  No se encontraron aprendices.
                </p>
              )}
            </div>
          </div>

          {/* Visualizar/Modificar Datos del Aprendiz */}
          {aprendizSeleccionado && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="text-center mb-3">
                  <FontAwesomeIcon icon={faUser} className="me-2" />{" "}
                  {modoEdicion
                    ? "Modificar Datos del Aprendiz"
                    : "Datos del Aprendiz"}
                </h3>
                <form onSubmit={(e) => e.preventDefault()} className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre || ""}
                      onChange={handleChangeForm}
                      readOnly={!modoEdicion}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="identificacion" className="form-label">
                      Identificación:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="identificacion"
                      name="identificacion"
                      value={formData.identificacion || ""}
                      onChange={handleChangeForm}
                      readOnly={!modoEdicion}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="correo" className="form-label">
                      Correo Electrónico:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      name="correo"
                      value={formData.correo || ""}
                      onChange={handleChangeForm}
                      readOnly={!modoEdicion}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="programa" className="form-label">
                      Programa de Formación:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="programa"
                      name="programa"
                      value={formData.programa || ""}
                      onChange={handleChangeForm}
                      readOnly={!modoEdicion}
                    />
                  </div>
                  {/* Agrega aquí más campos de información del aprendiz */}
                  <div className="col-12 text-center mt-3">
                    {modoEdicion ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-primary me-2"
                          onClick={handleGuardarCambios}
                        >
                          Guardar Cambios
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCancelarEdicion}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => setModoEdicion(true)}
                      >
                        Editar Datos
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionUsuarios;
