// src/pages/ForgotPassword.jsx
import axios from "axios";
import React, { useState } from "react";

function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/auth/solicitar-reset", {
        correo,
      });
      setMensaje("Revisa tu correo para el enlace de recuperación.");
    } catch (err) {
      setMensaje("Error: correo no registrado o problema del servidor.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">¿Olvidaste tu contraseña?</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button className="bg-blue-600 text-white p-2 rounded">
          Enviar enlace
        </button>
      </form>
      {mensaje && <p className="mt-4">{mensaje}</p>}
    </div>
  );
}

export default ForgotPassword;
