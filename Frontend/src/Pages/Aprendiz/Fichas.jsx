// // src/Pages/Aprendiz/Fichas.js

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiClientAxios } from "../../services/Axios";

const Fichas = () => {
  const [fichasSubidas, setFichasSubidas] = useState([]);
  const {
    idUsuario: idaprendiz,
    roleUsuario,
    fichaActiva,
    setFichaActiva,
  } = useAuth();
  const { idFicha } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarFichas = async () => {
      if (!idaprendiz) return;
      try {
        // La URL debe coincidir con tu archivo de rutas de backend
        const response = await apiClientAxios.get(
          `/aprendizFicha/fichas/${idaprendiz}`
        );
        setFichasSubidas(response.data);
      } catch (error) {
        console.error("Error al cargar las fichas:", error);
        setFichasSubidas([]); // En caso de error, limpiar las fichas
      }
    };
    cargarFichas();
  }, [idaprendiz]);

  // === ESTA FUNCIÓN HA SIDO MODIFICADA ===
  const handleVisualizarFicha = (ficha) => {
    // Si la ficha seleccionada es la que ya está activa, la desactivamos
    if (fichaActiva === ficha.id_ficha) {
      setFichaActiva(null);
      // IMPORTANTE: Limpiamos el ID de localStorage
      localStorage.removeItem("id_ficha_aprendiz");
      navigate(`/${roleUsuario}/fichas`);
    } else {
      // Si es una ficha nueva, la activamos
      setFichaActiva(ficha.id_ficha);
      // IMPORTANTE: Guardamos el ID de la relación en localStorage
      localStorage.setItem("id_ficha_aprendiz", ficha.id_ficha_aprendiz);
      navigate(`/${roleUsuario}/fichas/${ficha.id_ficha}`);
    }
  };

  useEffect(() => {
    // Sincroniza el estado de la ficha activa con el parámetro de la URL
    if (idFicha && fichaActiva !== idFicha) {
      setFichaActiva(idFicha);
      // También podríamos buscar la ficha y establecer el localStorage aquí
      // pero el flujo principal ya lo hace en handleVisualizarFicha
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

      {idFicha ? (
        <div className="alert alert-success text-center">
          Ficha seleccionada: <strong>{idFicha}</strong>. Ahora puedes ir a
          subir tus bitácoras.
        </div>
      ) : (
        <div className="alert alert-info text-center">
          Selecciona una ficha para ver sus detalles y poder subir bitácoras.
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
                  // Pasamos el objeto 'ficha' completo
                  onClick={() => handleVisualizarFicha(ficha)}
                >
                  {fichaActiva === ficha.id_ficha
                    ? "Ficha Seleccionada"
                    : // Eliminé el ícono para simplificar
                      "Seleccionar Ficha"}
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
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { apiClientAxios } from "../../services/Axios";

// const Fichas = () => {
//   const [fichasSubidas, setFichasSubidas] = useState([]);
//   const {
//     idUsuario: idaprendiz,
//     roleUsuario,
//     fichaActiva,
//     setFichaActiva,
//   } = useAuth();
//   const { idFicha } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (idFicha && fichaActiva !== idFicha) {
//       setFichaActiva(idFicha);
//     }
//   }, [idFicha, fichaActiva, setFichaActiva]);

//   const cargarFichas = async () => {
//     try {
//       const response = await apiClientAxios.get(
//         `/aprendizFicha/fichas/${idaprendiz}`
//       );
//       setFichasSubidas(response.data);
//     } catch (error) {
//       console.error("Error al cargar las fichas:", error);
//     }
//   };

//   const handleVisualizarFicha = (fichaId) => {
//     if (fichaActiva === fichaId) {
//       setFichaActiva(null);
//       navigate(`/${roleUsuario}/fichas`);
//     } else {
//       setFichaActiva(fichaId);
//       navigate(`/${roleUsuario}/fichas/${fichaId}`);
//     }
//   };

//   useEffect(() => {
//     cargarFichas();
//   }, [idaprendiz]);

//   return (
//     <div
//       className="mx-auto mt-5 p-4"
//       style={{
//         maxWidth: "1200px",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         backgroundColor: "#fff",
//       }}
//     >
//       <h2 className="mb-4 text-center">Gestión de Fichas</h2>

//       {idFicha ? (
//         <div className="alert alert-success text-center">
//           Ficha seleccionada: <strong>{idFicha}</strong>
//         </div>
//       ) : (
//         <div className="alert alert-info text-center">
//           Selecciona una ficha para ver más detalles
//         </div>
//       )}

//       <div
//         className="d-flex flex-wrap justify-content-center gap-4"
//         style={{ rowGap: "2rem" }}
//       >
//         {fichasSubidas.length > 0 ? (
//           fichasSubidas.map((ficha) => (
//             <div
//               key={ficha.id_ficha}
//               className="card shadow-sm"
//               style={{ width: "18rem", flex: "0 0 auto" }}
//             >
//               <div className="card-body">
//                 <h5 className="card-title">{ficha.num_programa}</h5>
//                 <p className="card-text">
//                   <strong>Termino:</strong> {ficha.termino}
//                 </p>
//                 <p className="card-text">
//                   <strong>Nombre:</strong> {ficha.nombre}
//                 </p>
//                 <button
//                   className={`btn btn-sm ${
//                     fichaActiva === ficha.id_ficha ? "btn-success" : "btn-info"
//                   }`}
//                   onClick={() => handleVisualizarFicha(ficha.id_ficha)}
//                 >
//                   {fichaActiva === ficha.id_ficha
//                     ? "Ficha seleccionada"
//                     : "Seleccionar ficha"}
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center w-100">No tiene fichas.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Fichas;
