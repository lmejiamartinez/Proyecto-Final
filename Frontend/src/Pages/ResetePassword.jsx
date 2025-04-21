// src/pages/ResetPassword.jsx
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:4000/api/auth/reset-password/${token}`,
        {
          nuevaContrasena,
        }
      );
      setMensaje("Contraseña cambiada correctamente.");
    } catch (err) {
      setMensaje("Error: el enlace expiró o es inválido.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Nueva Contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Escribe tu nueva contraseña"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button className="bg-green-600 text-white p-2 rounded">
          Cambiar contraseña
        </button>
      </form>
      {mensaje && <p className="mt-4">{mensaje}</p>}
    </div>
  );
}

export default ResetPassword;
