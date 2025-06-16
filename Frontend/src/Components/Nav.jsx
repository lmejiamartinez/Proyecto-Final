import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import senaLogo from "../assets/logo-sena.png";

const Nav = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [noLeidas, setNoLeidas] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const id_usuario = localStorage.getItem("id_usuario"); // Ajusta esto si usas contexto o Redux

  const fetchNotificaciones = async () => {
    try {
      const { data } = await axios.get(`/api/notificaciones/${id_usuario}`);
      setNotificaciones(data);
      const noLeidasCount = data.filter((n) => n.estado === "no_leida").length;
      setNoLeidas(noLeidasCount);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    }
  };

  const marcarComoLeidas = async () => {
    try {
      await axios.patch(`/api/notificaciones/leidas/${id_usuario}`);
      fetchNotificaciones();
    } catch (error) {
      console.error("Error al marcar como leídas:", error);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 30000); // cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className="navbar navbar-expand navbar-light shadow-sm p-0 m-0 d-flex align-items-center"
      style={{
        height: "80px",
        backgroundColor: "#f8f9fa",
        position: "fixed",
        top: 0,
        left: "250px",
        width: "calc(100vw - 250px)",
        zIndex: 101,
        justifyContent: "flex-start",
        overflowX: "hidden",
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
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
      <div
        className="d-flex align-items-center"
        style={{
          whiteSpace: "nowrap",
          marginLeft: "auto",
          marginRight: "20px",
        }}
      >
        <div className="position-relative">
          <button
            className="btn position-relative me-3"
            onClick={() => {
              setDropdownVisible(!dropdownVisible);
              marcarComoLeidas();
            }}
          >
            <i className="bi bi-bell fs-5"></i>
            {noLeidas > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.6rem" }}
              >
                {noLeidas}
              </span>
            )}
          </button>

          {dropdownVisible && (
            <div
              className="dropdown-menu show p-2"
              style={{
                right: 0,
                left: "auto",
                maxHeight: "300px",
                overflowY: "auto",
                width: "300px",
              }}
            >
              {notificaciones.length === 0 ? (
                <span className="dropdown-item-text text-muted">
                  No hay notificaciones
                </span>
              ) : (
                notificaciones.slice(0, 6).map((noti) => (
                  <div key={noti.id} className="dropdown-item">
                    <strong>{noti.titulo}</strong>
                    <div style={{ fontSize: "0.8rem" }}>{noti.mensaje}</div>
                    <div className="text-muted" style={{ fontSize: "0.7rem" }}>
                      {new Date(noti.fecha).toLocaleString()}
                    </div>
                    <hr className="my-1" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <i className="bi bi-person-circle fs-4"></i>
      </div>
    </nav>
  );
};

export default Nav;
