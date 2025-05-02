import { faEye, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiClientAxios } from "../../services/Axios";

const Fichas = () => {
  const [fichasSubidas, setFichasSubidas] = useState([]);

  const { idUsuario: idaprendiz, roleUsuario } = useAuth();
  const navigate = useNavigate();
  const cargarFichas = async () => {
    try {
      const response = await apiClientAxios.get(`/aprendizFicha/aprendiz-ficha/${idaprendiz}`);
      const { data } = response;
      setFichasSubidas(data);
    } catch (error) {
      console.error("error al cargar las fichas", error);
    }
  };
  const handleVisualizarFicha = (idficha) => {
    navigate(`/${roleUsuario}/fichas/${idficha}/visitas`);
  };

  useEffect(() => {
    cargarFichas();
  }, [idaprendiz]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Fichas de Instructor</h2>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {/* Subir Fichas */}
          {/* <div className="card shadow-sm mb-4">
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
          </div> */}

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
                      key={ficha.id_ficha}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {ficha.num_programa}
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleVisualizarFicha(ficha.id_ficha)}
                      >
                        <FontAwesomeIcon icon={faTable} className="me-1" /> Ver
                        Ficha
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No hay fichas subidas aún.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fichas;
