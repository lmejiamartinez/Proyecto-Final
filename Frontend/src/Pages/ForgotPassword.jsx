// src/pages/auth/ResetPassword.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <div className="d-flex justify-content-center align-items-center bg-light vh-100">
      <div className="bg-white p-4 rounded shadow-sm w-100 max-w-md">
        <div className="d-flex justify-content-center mb-3">
          <div className="bg-success text-white rounded-circle p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-key-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 5zM2.5 9a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
            </svg>
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
          <button type="submit" className="btn btn-primary w-100">
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
