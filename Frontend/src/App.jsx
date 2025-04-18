import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./Components/Nav.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <Router>
      <div
        className="d-flex"
        style={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}
      >
        <Sidebar />
        <div className="d-flex flex-column flex-grow-1" style={{ flex: 1 }}>
          <Navbar />
          <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />{" "}
              {/* Ruta para la página principal */}
              <Route path="/visitas" element={<Visitas />} />
              <Route path="/bitacoras" element={<Bitacoras />} />
              <Route path="/fichas" element={<Fichas />} />
              <Route path="/documentos" element={<Documentos />} />
              <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
