import {
  faBriefcase,
  faCalendarAlt,
  faEnvelope,
  faIdCard,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PerfilInstructor = () => {
  // Simulación de los datos del instructor (reemplazar con datos reales)
  const instructorInfo = {
    nombre: localStorage.getItem("nombreUsuario") || "Nombre del Instructor",
    correo:
      localStorage.getItem("correoUsuario") || "correo.instructor@ejemplo.com",
    identificacion: "987654321",
    especialidad: "Programación Web",
    fechaRegistro: "2023-11-20",
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Información de tu cuenta</h2>
      <div className="bg-white shadow p-4 rounded">
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
            <FontAwesomeIcon icon={faUserTie} />
          </div>
          <div>
            <h5 className="mb-0">{instructorInfo.nombre}</h5>
            <small className="text-muted">Instructor</small>
          </div>
        </div>

        <div className="mb-3">
          <FontAwesomeIcon icon={faUserTie} className="me-2 text-secondary" />
          <strong>Nombre:</strong> {instructorInfo.nombre}
        </div>
        <div className="mb-3">
          <FontAwesomeIcon icon={faEnvelope} className="me-2 text-secondary" />
          <strong>Correo Electrónico:</strong> {instructorInfo.correo}
        </div>
        <div className="mb-3">
          <FontAwesomeIcon icon={faIdCard} className="me-2 text-secondary" />
          <strong>Número de Identificación:</strong>{" "}
          {instructorInfo.identificacion}
        </div>
        <div className="mb-3">
          <FontAwesomeIcon icon={faBriefcase} className="me-2 text-secondary" />
          <strong>Especialidad:</strong> {instructorInfo.especialidad}
        </div>
        <div className="mb-3">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="me-2 text-secondary"
          />
          <strong>Fecha de Registro:</strong> {instructorInfo.fechaRegistro}
        </div>

        <button className="btn btn-warning">Editar información</button>
      </div>
    </div>
  );
};

export default PerfilInstructor;
