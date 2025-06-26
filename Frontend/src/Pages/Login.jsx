import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiClientAxios } from "../services/Axios";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const { validarUsuario } = useAuth();

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiClientAxios.post("/auth/login", {
        correo: correo,
        clave: password,
      });

      const { data } = response;

      if (!data.success) {
        setError(data.mensaje || "Credenciales inválidas.");
        return;
      }

      const usuario = await validarUsuario();

      if (usuario?.rol === "Instructor") {
        navigate("/instructor");
      } else if (usuario?.rol === "Aprendiz") {
        navigate("/aprendiz/fichas");
      } else if (usuario?.rol === "Administrador") {
        navigate("/administrador");
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data || error);
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
        {/* Lado Izquierdo */}
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
        </div>

        {/* Lado Derecho */}
        <div
          className="flex-grow-1 d-flex flex-column justify-content-center"
          style={{ marginRight: "20px" }}
        >
          <div className="d-flex justify-content-center mb-3">
            <FontAwesomeIcon icon={faUser} size="3x" color="#C4C4C6" />
          </div>
          <form onSubmit={handleSubmit} className="mt-5 py-4">
            <div className="mb-5">
              <label htmlFor="correo" className="form-label visually-hidden">
                Correo electrónico:
              </label>
              <input
                type="email"
                className="form-control border-0 border-bottom"
                id="correo"
                placeholder="Correo electrónico"
                value={correo}
                onChange={handleCorreoChange}
                style={{ borderBottomWidth: "2px" }}
                required
              />
            </div>
            <div className="mb-4 position-relative">
              <label htmlFor="password" className="form-label visually-hidden">
                Contraseña:
              </label>
              <input
                type={mostrarPassword ? "text" : "password"}
                className="form-control border-0 border-bottom"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                style={{ borderBottomWidth: "2px", paddingRight: "40px" }}
                required
              />
              <span
                onClick={() => setMostrarPassword(!mostrarPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#6c757d",
                }}
              >
                <FontAwesomeIcon icon={mostrarPassword ? faEye : faEyeSlash} />
              </span>
            </div>

            {error && <p className="text-danger text-center">{error}</p>}
            <div className="mb-3 text-end">
              <Link
                to="/auth/forgot-password"
                className="text-decoration-none text-secundary"
              >
                ¿Olvidé mi contraseña?
              </Link>
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
