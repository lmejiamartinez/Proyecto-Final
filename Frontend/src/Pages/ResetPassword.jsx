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
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Restablecer Contraseña</h2>

      {mensaje && <p className="mb-4 text-red-500">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaClave}
          onChange={(e) => setNuevaClave(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmarClave}
          onChange={(e) => setConfirmarClave(e.target.value)}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
