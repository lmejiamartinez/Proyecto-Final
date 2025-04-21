import {
  faEye,
  faTable,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const GestionFichasInstructor = () => {
  const [fichasSubidas, setFichasSubidas] = useState([]);
  const [nuevaFicha, setNuevaFicha] = useState("");
  const [aprendicesPorFicha, setAprendicesPorFicha] = useState({});
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  const [aprendicesFichaSeleccionada, setAprendicesFichaSeleccionada] =
    useState([]);

  useEffect(() => {
    // Simulación de carga de fichas subidas desde el backend
    const cargarFichas = async () => {
      // Reemplaza esto con tu llamada real a la API
      setTimeout(() => {
        setFichasSubidas([
          { id: 1, numeroFicha: "2701567" },
          { id: 2, numeroFicha: "2701568" },
        ]);
      }, 500);
    };

    cargarFichas();

    // Simulación de carga de aprendices por ficha
    const cargarAprendicesPorFicha = async () => {
      // Reemplaza esto con tu llamada real a la API
      setTimeout(() => {
        setAprendicesPorFicha({
          2701567: [
            { id: 101, nombre: "Aprendiz Uno", correo: "uno@ejemplo.com" },
            { id: 102, nombre: "Aprendiz Dos", correo: "dos@ejemplo.com" },
          ],
          2701568: [
            { id: 103, nombre: "Aprendiz Tres", correo: "tres@ejemplo.com" },
          ],
        });
      }, 750);
    };

    cargarAprendicesPorFicha();
  }, []);

  const handleSubirFicha = async (event) => {
    event.preventDefault();
    if (nuevaFicha.trim()) {
      // Aquí deberías enviar 'nuevaFicha' al backend para guardar
      console.log("Subiendo ficha:", nuevaFicha);
      // Simulación de guardado exitoso
      const nuevaFichaObj = { id: Date.now(), numeroFicha: nuevaFicha };
      setFichasSubidas([...fichasSubidas, nuevaFichaObj]);
      setNuevaFicha("");
      alert("Ficha subida exitosamente (simulado)");
    } else {
      alert("Por favor, ingresa el número de la ficha.");
    }
  };

  const handleVisualizarFicha = (ficha) => {
    setFichaSeleccionada(ficha.numeroFicha);
    setAprendicesFichaSeleccionada(aprendicesPorFicha[ficha.numeroFicha] || []);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Fichas de Instructor</h2>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {/* Subir Fichas */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="text-center mb-3">
                <FontAwesomeIcon icon={faUpload} className="me-2" /> Subir Ficha
                al Sistema
              </h3>
              <form
                onSubmit={handleSubirFicha}
                className="row g-3 align-items-center"
              >
                <div className="col-md-9">
                  <label htmlFor="nuevaFicha" className="form-label">
                    Número de Ficha:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nuevaFicha"
                    value={nuevaFicha}
                    onChange={(e) => setNuevaFicha(e.target.value)}
                    placeholder="Ej: 2701XXX"
                    required
                  />
                </div>
                <div className="col-md-3 text-center">
                  <button type="submit" className="btn btn-primary">
                    Subir Ficha
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Visualizar Fichas */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-3">
                <FontAwesomeIcon icon={faEye} className="me-2" /> Visualizar
                Fichas
              </h3>
              {fichasSubidas.length > 0 ? (
                <ul className="list-group">
                  {fichasSubidas.map((ficha) => (
                    <li
                      key={ficha.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {ficha.numeroFicha}
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleVisualizarFicha(ficha)}
                      >
                        <FontAwesomeIcon icon={faTable} className="me-1" /> Ver
                        Aprendices
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No hay fichas subidas aún.</p>
              )}
            </div>
          </div>

          {/* Tabla Dinámica de Aprendices por Ficha */}
          {fichaSeleccionada && aprendicesFichaSeleccionada.length > 0 && (
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h4 className="mb-3">
                  <FontAwesomeIcon icon={faUser} className="me-2" /> Aprendices
                  de la Ficha {fichaSeleccionada}
                </h4>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre del Aprendiz</th>
                        <th>Correo Electrónico</th>
                        {/* Agrega más columnas si es necesario */}
                      </tr>
                    </thead>
                    <tbody>
                      {aprendicesFichaSeleccionada.map((aprendiz) => (
                        <tr key={aprendiz.id}>
                          <td>{aprendiz.id}</td>
                          <td>{aprendiz.nombre}</td>
                          <td>{aprendiz.correo}</td>
                          {/* Agrega más celdas si es necesario */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setFichaSeleccionada(null)}
                  >
                    Cerrar Tabla de Aprendices
                  </button>
                </div>
              </div>
            </div>
          )}

          {fichaSeleccionada && aprendicesFichaSeleccionada.length === 0 && (
            <div className="alert alert-info mt-4 text-center">
              No hay aprendices asociados a la ficha {fichaSeleccionada}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionFichasInstructor;
