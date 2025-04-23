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
        // Ajusta la lógica para verificar 'mensaje'
        setMensaje(
          "Revisa tu correo. Te enviamos un enlace para cambiar la contraseña."
        );
      } else {
        setError(response.data.error || "No se pudo enviar el correo."); // Usa 'error' si tu backend lo envía así
      }
    } catch (err) {
      console.error("Error enviando correo:", err);
      setError("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">¿Olvidaste tu contraseña?</h2>
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
        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success w-100">
          Enviar enlace
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
