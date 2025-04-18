import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const Sidebar = () => {
  return (
    <div
      className="bg-light text-black p-3 shadow d-flex flex-column"
      style={{ width: "250px", height: "100vh" }}
    >
      <h4>Mi Sistema</h4>
      <ul className="nav flex-column mt-3" style={{ flexGrow: 1 }}>
        <li className="nav-item mb-5 pt-3">
          <a className="nav-link text-black me-2" href="#">
            <i class="bi bi-calendar2-event-fill me-3"></i>
            Visitas
          </a>
        </li>
        <li className="nav-item mb-5">
          <a className="nav-link text-black" href="#">
            <i class="bi bi-arrow-down-circle-fill me-3"></i>
            Bitácoras
          </a>
        </li>
        <li className="nav-item mb-5">
          <a className="nav-link text-black" href="#">
            <i class="bi bi-grid-fill me-3"></i>
            Fichas
          </a>
        </li>
        <li className="nav-item mb-5">
          <a className="nav-link text-black" href="#">
            <i class="bi bi-folder-fill me-3"></i>
            Documentos
          </a>
        </li>
        <li className="nav-item pt-3 mb-5">
          <a className="nav-link text-black" href="#">
            <i class="bi bi-person-fill me-3"></i>
            Usuarios
          </a>
        </li>
      </ul>
      <hr className="mt-4 mb-2" /> {/* Añadimos la línea horizontal */}
      <div className="mt-auto ">
        <li className="nav-item pt-3 mb-5" style={{ listStyleType: "none" }}>
          <a className="nav-link text-black" href="#">
            <i
              class="bi bi-arrow-left-circle-fill me-3 "
              style={{ marginLeft: "20px", verticalAlign: "middle" }}
            ></i>
            Salir
          </a>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
