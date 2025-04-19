import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-light text-black p-3 shadow d-flex flex-column"
      style={{
        width: "250px",
        position: "fixed",
        left: 0,
        bottom: 0, // Lo fijamos a la parte inferior
        zIndex: 100,
        // height: 'auto', // No forzamos una altura específica aquí
      }}
    >
      <h4>Mi Sistema</h4>
      <ul className="nav flex-column mt-3" style={{ flexGrow: 1 }}>
        <li className="nav-item mb-5 pt-3">
          <Link to="/visitas" className="nav-link text-black me-2">
            <i className="bi bi-calendar2-event-fill me-3"></i>
            Visitas
          </Link>
        </li>
        <li className="nav-item mb-5">
          <Link to="/bitacoras" className="nav-link text-black">
            <i className="bi bi-arrow-down-circle-fill me-3"></i>
            Bitácoras
          </Link>
        </li>
        <li className="nav-item mb-5">
          <Link to="/fichas" className="nav-link text-black">
            <i className="bi bi-grid-fill me-3"></i>
            Fichas
          </Link>
        </li>
        <li className="nav-item mb-5">
          <Link to="/documentos" className="nav-link text-black">
            <i className="bi bi-folder-fill me-3"></i>
            Documentos
          </Link>
        </li>
        <li className="nav-item pt-3 mb-5">
          <Link to="/usuarios" className="nav-link text-black">
            <i className="bi bi-person-fill me-3"></i>
            Usuarios
          </Link>
        </li>
      </ul>
      <hr className="mt-4 mb-2" />
      <div className="mt-auto ">
        <li className="nav-item pt-3 mb-2" style={{ listStyleType: "none" }}>
          <Link
            to="/"
            className="nav-link text-black d-flex align-items-center"
          >
            <i
              className="bi bi-arrow-left-circle-fill me-3 "
              style={{ marginLeft: "20px", verticalAlign: "middle" }}
            ></i>
            Salir
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
