import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Un icono de sobre para "olvidé mi contraseña"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClientAxios } from "../services/Axios";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const response = await apiClientAxios.post("/auth/forgot-password", {
        correo,
      });

      if (response.data.mensaje) {
        setMensaje(
          "Revisa tu correo. Te enviamos un enlace para cambiar la contraseña."
        );
      } else {
        setError(response.data.error || "No se pudo enviar el correo.");
      }
    } catch (err) {
      console.error("Error enviando correo:", err);
      setError("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <div className="d-flex  justify-content-center align-items-center bg-light ">
      <div className="bg-white p-4 rounded shadow-sm w-100 max-w-md">
        <div className="d-flex justify-content-center mb-3">
          <div
            className="text-white rounded-circle p-3"
            style={{ background: "rgb(112, 178, 45)" }}
          >
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </div>
        </div>
        <h2 className="text-center mb-3">¿Olvidaste tu contraseña?</h2>
        {mensaje && (
          <div className={`alert alert-success mb-3`} role="alert">
            {mensaje}
          </div>
        )}
        {error && (
          <div className={`alert alert-danger mb-3`} role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className=" w-100"
            style={{ background: "rgb(112, 178, 45)" }}
          >
            Enviar enlace
          </button>
          <p className="mt-3 text-center">
            ¿Volver al <a href="/auth/login">Inicio de Sesión</a>?
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
