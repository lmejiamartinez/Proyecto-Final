import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiClientAxios } from "../../services/Axios";

const Fichas = () => {
  const [fichasSubidas, setFichasSubidas] = useState([]);
  const {
    idUsuario,
    roleUsuario,
    fichaActiva,
    setFichaActiva,
    setIdFichaAprendiz,
  } = useAuth();
  const { idFicha } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarFichas = async () => {
      if (!idUsuario) return;
      try {
        const response = await apiClientAxios.get(
          `/aprendizFicha/fichas/${idUsuario}`
        );
        setFichasSubidas(response.data);
      } catch (error) {
        console.error("Error al cargar las fichas:", error);
        setFichasSubidas([]);
      }
    };
    cargarFichas();
  }, [idUsuario]);

  const obtenerFichaAprendiz = async (idFicha) => {
    try {
      const res = await apiClientAxios.get(
        `/aprendizFicha/buscar/${idUsuario}/${idFicha}`
      );
      setIdFichaAprendiz(res.data.id_ficha_aprendiz);
    } catch (error) {
      console.error("❌ Error al obtener id_ficha_aprendiz", error);
    }
  };

  const handleVisualizarFicha = async (ficha) => {
    if (fichaActiva === ficha.id_ficha) {
      setFichaActiva(null);
      setIdFichaAprendiz(null);
      sessionStorage.removeItem("fichaActiva");
      navigate(`/${roleUsuario}/fichas`);
    } else {
      setFichaActiva(ficha.id_ficha);
      await obtenerFichaAprendiz(ficha.id_ficha);
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
    <div
      className="mx-auto mt-5 p-4"
      style={{
        maxWidth: "1200px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h2 className="mb-4 text-center">Gestión de Fichas</h2>

      {fichaActiva ? (
        <div className="alert alert-success text-center">
          Ficha seleccionada: <strong>{fichaActiva}</strong>. Ahora puedes ver detallesde la ficha.
        </div>
      ) : (
        <div className="alert alert-info text-center">
          Selecciona una ficha para ver sus detalles.
        </div>
      )}

      <div
        className="d-flex flex-wrap justify-content-center gap-4"
        style={{ rowGap: "2rem" }}
      >
        {fichasSubidas.length > 0 ? (
          fichasSubidas.map((ficha) => (
            <div
              key={ficha.id_ficha}
              className="card shadow-sm"
              style={{ width: "18rem", flex: "0 0 auto" }}
            >
              <div className="card-body">
                <h5 className="card-title">Ficha: {ficha.num_programa}</h5>
                <p className="card-text">
                  <strong>Nombre:</strong> {ficha.nombre}
                </p>
                <p className="card-text">
                  <strong>Término:</strong> {ficha.termino}
                </p>
                <button
                  className={`btn w-100 ${
                    fichaActiva === ficha.id_ficha ? "btn-success" : "btn-info"
                  }`}
                  onClick={() => handleVisualizarFicha(ficha)}
                >
                  {fichaActiva === ficha.id_ficha
                    ? "Ficha Seleccionada"
                    : "Seleccionar Ficha"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-100">No tienes fichas asignadas.</p>
        )}
      </div>
    </div>
  );
};

export default Fichas;
