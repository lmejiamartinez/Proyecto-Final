import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import senaLogo from "../assets/logo-sena.png";

const Nav = () => {
  return (
    <nav
      className="navbar navbar-expand navbar-light shadow-sm sticky-top w-100 p-0 d-flex justify-content-between align-items-center"
      style={{ height: "70px", backgroundColor: "#f8f9fa" }}
    >
      {/* Logo y texto de SENA */}
      <div className="d-flex align-items-center ms-4">
        <img src={senaLogo} alt="SENA Logo" height="50" className="me-2" />{" "}
        {/* Muestra el logo */}
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: "13px" }}
        >
          <div
            style={{
              borderLeft: "1px solid #C4C4C6",
              height: "40px",
              marginRight: "20px",
            }}
          ></div>{" "}
          {/* Línea vertical */}
          <div className="d-flex flex-column">
            <span className="fw-bold fs-6" style={{ color: "#70b22d" }}>
              Sistema Seguimiento
            </span>
            <span className="fw-bold fs-6" style={{ color: "#70b22d" }}>
              Etapa Práctica
            </span>
          </div>
        </div>
      </div>
      {/* Espaciador flexible */}
      <div style={{ flexGrow: 1 }} />
      {/* Contenedor del buscador */}
      <div style={{ maxWidth: "180px" }}>
        <form className="d-flex w-100">
          <input
            className="form-control form-control-sm w-100"
            type="search"
            placeholder="Buscar..."
            aria-label="Search"
          />
        </form>
      </div>
      {/* Espacio entre el buscador y los iconos */}
      <div style={{ width: "20px" }} />
      {/* Contenedor de iconos a la derecha */}
      <div className="d-flex align-items-center me-4">
        <button
          className="btn position-relative me-3"
          style={{ display: "flex", alignItems: "center" }}
        >
          <i className="bi bi-bell fs-5"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>
        <i className="bi bi-person-circle fs-4"></i>
      </div>
    </nav>
  );
};

export default Nav;
