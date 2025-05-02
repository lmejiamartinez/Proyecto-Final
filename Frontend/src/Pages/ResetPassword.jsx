// src/pages/auth/ResetPassword.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Importa la biblioteca de iconos que estés usando (ej. Font Awesome)
import { faKey } from "@fortawesome/free-solid-svg-icons"; // Importa el icono de llave
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [nuevaClave, setNuevaClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevaClave !== confirmarClave) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/reset-password/${token}`,
        { nuevaClave }
      );

      if (
        response.status === 200 &&
        response.data.mensaje === "Contraseña actualizada correctamente."
      ) {
        setMensaje("¡Contraseña actualizada correctamente!");
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } else {
        setMensaje("Ocurrió un problema inesperado. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMensaje(
        error.response?.data?.mensaje || "Error al restablecer la contraseña"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light ">
      <div className="bg-white p-4 rounded shadow-sm w-100 max-w-md">
        <div className="d-flex justify-content-center mb-3">
          <div
            className="text-white rounded-circle p-3"
            style={{ background: "rgb(112, 178, 45)" }}
          >
            <FontAwesomeIcon icon={faKey} size="lg" />
          </div>
        </div>
        <h2 className="text-center mb-3">Restablecer Contraseña</h2>
        {mensaje && (
          <div
            className={`alert ${
              mensaje.startsWith("¡") ? "alert-success" : "alert-danger"
            } mb-3`}
            role="alert"
          >
            {mensaje}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nuevaClave" className="form-label">
              Nueva contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="nuevaClave"
              placeholder="Nueva contraseña"
              value={nuevaClave}
              onChange={(e) => setNuevaClave(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmarClave" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmarClave"
              placeholder="Confirmar contraseña"
              value={confirmarClave}
              onChange={(e) => setConfirmarClave(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className=" w-100"
            style={{ background: "rgb(112, 178, 45)" }}
          >
            Cambiar contraseña
          </button>
        </form>
        <p className="mt-3 text-center">
          ¿Volver al <a href="/auth/login">Inicio de Sesión</a>?
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
