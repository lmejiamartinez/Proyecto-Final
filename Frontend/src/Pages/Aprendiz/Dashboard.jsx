import {
  faBook,
  faCalendarAlt,
  faEnvelope,
  faIdCard,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PerfilAprendiz = () => {
  // Simulación de los datos del aprendiz (reemplazar con datos reales)
  const aprendizInfo = {
    nombre: localStorage.getItem("nombreUsuario") || "Nombre del Aprendiz",
    correo:
      localStorage.getItem("correoUsuario") || "correo.aprendiz@ejemplo.com",
    numeroFicha: "1234567",
    programaFormacion: "Desarrollo de Software",
    fechaRegistro: "2024-05-10",
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

        <button className="btn btn-warning">Editar información</button>
      </div>
    </div>
  );
};

export default PerfilAprendiz;
