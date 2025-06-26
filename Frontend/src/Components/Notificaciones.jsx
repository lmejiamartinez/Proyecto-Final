import React from "react";
import { FaBell } from "react-icons/fa";
import { useNotificaciones } from "../context/NotificacionesContext";

const Notificaciones = ({ onClick }) => {
  const { noLeidas } = useNotificaciones();

  return (
    <div style={{ position: "relative", cursor: "pointer" }} onClick={onClick}>
      <FaBell size={24} />
      {noLeidas > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
          }}
        >
          {noLeidas}
        </span>
      )}
    </div>
  );
};

export default Notificaciones;
