import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const Fichas = () => {
  const [fichas, setFichas] = useState([]);
  const {
    idUsuario,
    roleUsuario,
    fichaActiva,
    setFichaActiva,
    setFichasUsuario,
  } = useAuth();

  const navigate = useNavigate();
  const { idFicha } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/fichas/instructor", {
        withCredentials: true,
      })
      .then((response) => {
        setFichas(response.data);
        const formatoFichas = response.data.map((f) => ({
          id: f.id_ficha,
          numero: f.num_programa,
        }));
        setFichasUsuario(formatoFichas);
      })
      .catch((error) => {
        console.error("Error al obtener fichas del instructor:", error);
      });
  }, []);

  const handleSeleccionarFicha = (ficha) => {
    if (fichaActiva === ficha.id_ficha) {
      setFichaActiva(null);
      sessionStorage.removeItem("fichaActiva");
      navigate(`/${roleUsuario}/fichas`);
    } else {
      setFichaActiva(ficha.id_ficha);
      sessionStorage.setItem("fichaActiva", ficha.id_ficha);
      navigate(`/${roleUsuario}/fichas/${ficha.id_ficha}`);
    }
  };

  useEffect(() => {
    if (idFicha && fichaActiva !== idFicha) {
      setFichaActiva(idFicha);
    }
  }, [idFicha, fichaActiva, setFichaActiva]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Gestión de Fichas</h2>

      {fichaActiva ? (
        <div className="alert alert-success text-center">
          Ficha seleccionada: <strong>{fichaActiva}</strong>. Ya puedes ver visitas, bitácoras y documentos.
        </div>
      ) : (
        <div className="alert alert-info text-center">
          Selecciona una ficha para ver sus detalles.
        </div>
      )}

      <div className="row row-cols-1 ">
        {fichas.map((ficha) => (
          <div className="col" key={ficha.id_ficha}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Ficha: {ficha.num_programa}</h5>
                <p className="card-text">
                  <strong>Nombre:</strong> {ficha.nombre}
                  <br />
                  <strong>Término:</strong> {ficha.termino}
                </p>
                <button
                  className={`btn w-100 mt-3 ${
                    fichaActiva === ficha.id_ficha ? "btn-success" : "btn-info"
                  }`}
                  onClick={() => handleSeleccionarFicha(ficha)}
                >
                  {fichaActiva === ficha.id_ficha
                    ? "Ficha Seleccionada"
                    : "Seleccionar Ficha"}
                </button>
              </div>
            </div>
          </div>
        ))}
        {fichas.length === 0 && (
          <div className="col-12">
            <div className="alert alert-warning text-center">
              No tienes fichas asignadas actualmente.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fichas;
