import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import senaLogo from "../assets/logo-sena.png";

const Nav = () => {
  return (
    <nav
      className="navbar navbar-expand navbar-light shadow-sm p-0 m-0 d-flex align-items-center"
      style={{
        height: "70px",
        backgroundColor: "#f8f9fa",
        position: "fixed",
        top: 0,
        left: "250px",
        width: "calc(100vw - 250px)",
        zIndex: 101,
        justifyContent: "flex-start", // Cambiamos a flex-start para controlar mejor el espacio
        overflowX: "hidden",
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      {/* Logo y texto de SENA - Limitamos su ancho */}
      <div
        className="d-flex align-items-center"
        style={{
          whiteSpace: "nowrap",
          maxWidth: "220px",
          overflow: "hidden",
          marginLeft: "20px",
        }}
      >
        <img src={senaLogo} alt="SENA Logo" height="40" className="me-2" />
        <div className="d-flex align-items-center ">
          <div
            style={{
              borderLeft: "1px solid #C4C4C6",
              height: "30px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          ></div>
          <div
            className="d-flex flex-column"
            style={{ fontSize: "0.9rem", overflow: "hidden" }}
          >
            <span
              className="fw-bold text-truncate"
              style={{ color: "#70b22d" }}
            >
              Sistema Seguimiento
            </span>
            <span
              className="fw-bold text-truncate"
              style={{ color: "#70b22d" }}
            >
              Etapa Práctica
            </span>
          </div>
        </div>
      </div>
      {/* Contenedor de iconos a la derecha - Ajustamos márgenes */}
      <div
        className="d-flex align-items-center"
        style={{ whiteSpace: "nowrap", marginLeft: "720px" }}
      >
        <button
          className="btn position-relative me-1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <i className="bi bi-bell fs-5"></i>
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.6rem" }}
          >
            3
          </span>
        </button>
        <i className="bi bi-person-circle fs-4"></i>
      </div>
    </nav>
  );
};

export default Nav;
