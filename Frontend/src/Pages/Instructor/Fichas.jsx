import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiClientAxios } from "../../services/Axios";

const GestionFichasInstructor = () => {
  const [fichasSubidas, setFichasSubidas] = useState([]);
  const { idUsuario: idinstructor, roleUsuario } = useAuth();
  const navigate = useNavigate();

  const cargarFichas = async () => {
    try {
      const response = await apiClientAxios.get(`/fichas/${idinstructor}`);
      const { data } = response;
      setFichasSubidas(data);
    } catch (error) {
      console.error("Error al cargar las fichas:", error);
    }
  };

  const handleVisualizarFicha = (idficha) => {
    navigate(`/${roleUsuario}/fichas/${idficha}/visitas`);
  };

  useEffect(() => {
    cargarFichas();
  }, [idinstructor]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4  ">
        <FontAwesomeIcon className="me-2 " />
        Gestión de Fichas de Instructor
      </h2>
      <div className="row row-cols-1 row-cols-md-2 g-4 w-80 ">
        {fichasSubidas.length > 0 ? (
          fichasSubidas.map((ficha) => (
            <div key={ficha.id_ficha} className="col">
              <div className="card shadow-sm h-auto">
                <div
                  className="bg- p-4 text-center"
                  style={{ background: "#70b22d" }}
                >
                  <h5 className="card-title text-white mb-5">
                    Ficha {ficha.num_programa}
                  </h5>
                </div>
                <div className="bg-white p-2 text-center ">
                  <button
                    className="btn btn-outline btn-md fw-bold w-70"
                    onClick={() => handleVisualizarFicha(ficha.id_ficha)}
                  >
                    <FontAwesomeIcon className="me-1" />
                    Ver
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center text-muted py-5">
                <FontAwesomeIcon icon={faTable} size="lg" className="mb-2" />
                <p className="mb-0">No hay fichas subidas actualmente.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionFichasInstructor;
