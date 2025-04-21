import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiClientAxios } from "../services/Axios";

const Login = () => {
  const [correo, setCorreo] = useState(""); // Cambiamos 'email' a 'correo' para el estado
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { validarUsuario } = useAuth();

  const handleCorreoChange = (e) => {
    // Cambiamos 'handleEmailChange' a 'handleCorreoChange'
    setCorreo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar cualquier error previo

    try {
      const response = await apiClientAxios.post("/auth/login", {
        correo: correo,
        clave: password,
      });

      const { data } = response;

      if (!data.success) {
        setError(data.mensaje || "Credenciales inválidas."); // Usa data.mensaje si tu backend lo devuelve
      }

      const datosUsuario = await validarUsuario();
      if (datosUsuario.rol === "Instructor") {
        navigate("/instructor");
      } else if (datosUsuario.rol === "Aprendiz") {
        navigate("/aprendiz");
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        className="bg-white shadow d-flex gap-4"
        style={{
          maxWidth: "830px",
          width: "80%",
          minHeight: "500px",
          alignItems: "center",
        }}
      >
        {/* Lado Izquierdo - Imagen y Texto */}
        <div
          className="text-white p-4 d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            flex: 1,
            minHeight: "500px",
            minWidth: "400px",
            background: "rgb(112, 178, 45)",
          }}
        >
          <h2>Sistema de</h2>
          <h1>Seguimiento</h1>
          <h2>Etapa Practica</h2>
          <button
            className="text-whrite border-light rounded-pill mt-3"
            style={{
              background: "rgb(112, 178, 45)",
            }}
          >
            Crear Cuenta
          </button>
        </div>
        {/* Lado Derecho - Formulario de Inicio de Sesión */}
        <div
          className="flex-grow-1 d-flex flex-column justify-content-center"
          style={{
            marginRight: "20px",
          }}
        >
          <div className="d-flex justify-content-center mb-3 ">
            <FontAwesomeIcon icon={faUser} size="3x" color="#C4C4C6" />
          </div>
          <form onSubmit={handleSubmit} className="mt-5 py-4">
            <div className="mb-5">
              <label htmlFor="correo" className="form-label visually-hidden">
                {" "}
                {/* Cambiamos htmlFor */}
                Correo electrónico:
              </label>
              <input
                type="email"
                className="form-control border-0 border-bottom border-secundary"
                id="correo" // Cambiamos el id
                placeholder="Correo electrónico"
                value={correo} // Usamos 'correo'
                onChange={handleCorreoChange} // Usamos 'handleCorreoChange'
                style={{
                  borderBottomWidth: "2px",
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label visually-hidden">
                Contraseña:
              </label>
              <input
                type="password"
                className="form-control border-0 border-bottom border-secundary"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                style={{ borderBottomWidth: "2px", marginRight: "9px" }}
                required
              />
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="mb-3 text-end">
              <a href="#olvido" className="text-decoration-none text-secundary">
                ¿Olvidé mi contraseña?
              </a>
            </div>
            <button
              type="submit"
              className="rounded-pill justify-content-center w-100"
              style={{
                background: "rgb(112, 178, 45)",
                color: "white",
                padding: "10px 0",
                border: "none",
                cursor: "pointer",
              }}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
