import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./Components/Nav.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Bitacoras from "./Pages/Bitacoras.jsx";
import Dashboard from "./Pages/Dashboard";
import Documentos from "./Pages/Documentos.jsx";
import Fichas from "./Pages/Fichas.jsx";
import Login from "./Pages/Login.jsx";
import Usuarios from "./Pages/Usuarios.jsx";
import Visitas from "./Pages/Visitas.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />{" "}
        {/* Ruta para la página de login */}
        <Route
          path="/"
          element={
            <div // Modificamos este div
              style={{
                display: "flex",
                minHeight: "100vh",
                width: "100vw",
                overflow: "hidden",
                backgroundColor: "white", // Forzamos el fondo blanco para las rutas principales
              }}
            >
              <Sidebar />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  marginLeft: "250px",
                  paddingTop: "70px",
                }}
              >
                <Navbar />
                <div
                  style={{ flexGrow: 1, padding: "20px", overflowY: "auto" }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/visitas" element={<Visitas />} />
                    <Route path="/bitacoras" element={<Bitacoras />} />
                    <Route path="/fichas" element={<Fichas />} />
                    <Route path="/documentos" element={<Documentos />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
