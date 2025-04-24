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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-7-2a2 2 0 012 2m-2-4a2 2 0 012 2m-7-2v7m14-7v7m-4-3a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-center text-xl font-bold mb-6 text-gray-700">
          Restablecer Contraseña
        </h2>

        {mensaje && (
          <p
            className={`mb-4 text-center ${
              mensaje.startsWith("¡") ? "text-green-500" : "text-red-500"
            }`}
          >
            {mensaje}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nuevaClave"
            >
              Nueva contraseña
            </label>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={nuevaClave}
              onChange={(e) => setNuevaClave(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nuevaClave"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmarClave"
            >
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmarClave}
              onChange={(e) => setConfirmarClave(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmarClave"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Cambiar contraseña
          </button>
          <p className="text-center text-gray-600 text-xs">
            ¿Volver al <a href="/auth/login" className="text-blue-500 hover:underline">Inicio de Sesión</a>?
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;