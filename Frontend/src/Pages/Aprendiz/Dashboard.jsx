import {
  faBook,
  faCalendarAlt,
  faEnvelope,
  faIdCard,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const PerfilAprendiz = () => {
  // Estado para controlar si el formulario de edición está visible
  const [isEditing, setIsEditing] = useState(false);

  // Estado para almacenar los datos del aprendiz (inicializados con los datos del localStorage o valores por defecto)
  const [aprendizInfo, setAprendizInfo] = useState({
    nombre: localStorage.getItem("nombreUsuario") || "Nombre del Aprendiz",
    correo: localStorage.getItem("correoUsuario") || "correo.aprendiz@ejemplo.com",
    numeroFicha: "1234567",
    programaFormacion: "Desarrollo de Software",
    fechaRegistro: "2024-05-10",
  });

  // Función para manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAprendizInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para guardar los cambios (simulación)
  const handleGuardarCambios = () => {
    // Aquí iría la lógica para guardar los datos actualizados,
    // por ejemplo, enviándolos a una API o actualizando el localStorage
    console.log("Datos guardados:", aprendizInfo);
    setIsEditing(false); // Ocultar el formulario después de guardar
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Información de tu cuenta</h2>
      <div className="bg-white shadow p-4 rounded">
        {!isEditing ? (
          <>
            <div className="d-flex align-items-center mb-3">
              <div
                className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-3"
                style={{
                  width: "80px",
                  height: "80px",
                  color: "#fff",
                  fontSize: "2.5rem",
                }}
              >
                <FontAwesomeIcon icon={faUserGraduate} />
              </div>
              <div>
                <h5 className="mb-0">{aprendizInfo.nombre}</h5>
                <small className="text-muted">Aprendiz</small>
              </div>
            </div>

            <div className="mb-3">
              <FontAwesomeIcon
                icon={faUserGraduate}
                className="me-2 text-secondary"
              />
              <strong>Nombre:</strong> {aprendizInfo.nombre}
            </div>
            <div className="mb-3">
              <FontAwesomeIcon icon={faEnvelope} className="me-2 text-secondary" />
              <strong>Correo Electrónico:</strong> {aprendizInfo.correo}
            </div>
            <div className="mb-3">
              <FontAwesomeIcon icon={faIdCard} className="me-2 text-secondary" />
              <strong>Número de Ficha:</strong> {aprendizInfo.numeroFicha}
            </div>
            <div className="mb-3">
              <FontAwesomeIcon icon={faBook} className="me-2 text-secondary" />
              <strong>Programa de Formación:</strong>{" "}
              {aprendizInfo.programaFormacion}
            </div>
            <div className="mb-3">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="me-2 text-secondary"
              />
              <strong>Fecha de Registro:</strong> {aprendizInfo.fechaRegistro}
            </div>

            <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
              Editar información
            </button>
          </>
        ) : (
          <div>
            <h3>Editar Información</h3>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                <strong>Nombre:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={aprendizInfo.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                <strong>Correo Electrónico:</strong>
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                name="correo"
                value={aprendizInfo.correo}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numeroFicha" className="form-label">
                <strong>Número de Ficha:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="numeroFicha"
                name="numeroFicha"
                value={aprendizInfo.numeroFicha}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="programaFormacion" className="form-label">
                <strong>Programa de Formación:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="programaFormacion"
                name="programaFormacion"
                value={aprendizInfo.programaFormacion}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fechaRegistro" className="form-label">
                <strong>Fecha de Registro:</strong>
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaRegistro"
                name="fechaRegistro"
                value={aprendizInfo.fechaRegistro}
                onChange={handleInputChange}
              />
            </div>

            <button className="btn btn-primary me-2" onClick={handleGuardarCambios}>
              Guardar Cambios
            </button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilAprendiz;