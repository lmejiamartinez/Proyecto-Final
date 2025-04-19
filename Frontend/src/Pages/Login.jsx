import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Contraseña:", password);
    alert("¡Inicio de sesión exitoso! (Simulado)");
    navigate("/dashboard");
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
        padding: "20px", // Añadimos un poco de padding para que no esté pegado a los bordes si es necesario
      }}
    >
      <div
        className="bg-white  shadow  d-flex gap-4"
        style={{
          maxWidth: "830px",
          width: "80%",
          // Para aumentar la altura, podemos ajustar el minHeight de este contenedor
          minHeight: "500px", // Ajusta este valor según la altura que necesites
          alignItems: "center", // Aseguramos que los elementos internos estén centrados verticalmente
        }}
      >
        {/* Lado Izquierdo - Imagen y Texto */}
        <div
          className="text-white  p-4 d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            flex: 1,
            minHeight: "500px", // Ajusta este valor para aumentar la altura
            minWidth: "400px",
            background: "rgb(112, 178, 45)", // Cambia este valor al color deseado (verde más oscuro de Bootstrap)
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
              <label htmlFor="email" className="form-label visually-hidden">
                Correo electrónico:
              </label>
              <input
                type="email"
                className="form-control border-0 border-bottom border-secundary"
                id="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleEmailChange}
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
                style={{ borderBottomWidth: "2px", marginRight: "9px" }} // Añadimos margen derecho
                required
              />
            </div>
            <div className="mb-3 text-end">
              <a href="#olvido" className="text-decoration-none text-secundary">
                ¿Olvidé mi contraseña?
              </a>
            </div>
            <button
              type="submit"
              className=" rounded-pill justify-content-center"
              style={{
                background: "rgb(112, 178, 45)",
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
