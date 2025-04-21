import React, { useState } from "react";

const VisitasAprendiz = () => {
  const [nombre, setNombre] = useState("");
  const [numeroFicha, setNumeroFicha] = useState("");
  const [fecha, setFecha] = useState("");
  const [nombrePrograma, setNombrePrograma] = useState("");
  const [solicitudes, setSolicitudes] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevaSolicitud = {
      nombre,
      numeroFicha,
      fecha,
      nombrePrograma,
      fechaSolicitud: new Date().toLocaleDateString(), // Añadimos la fecha de solicitud
    };
    console.log("Solicitud de Visita:", nuevaSolicitud);
    setSolicitudes([...solicitudes, nuevaSolicitud]); // Agregamos la nueva solicitud a la lista
    // TODO: Enviar 'nuevaSolicitud' a tu backend

    // Opcional: Limpiar el formulario después del envío
    setNombre("");
    setNumeroFicha("");
    setFecha("");
    setNombrePrograma("");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Solicitar Visita</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="numeroFicha" className="form-label">
                Número de Ficha:
              </label>
              <input
                type="text"
                className="form-control"
                id="numeroFicha"
                value={numeroFicha}
                onChange={(e) => setNumeroFicha(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="fecha" className="form-label">
                Fecha de la Visita:
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nombrePrograma" className="form-label">
                Nombre del Programa:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombrePrograma"
                value={nombrePrograma}
                onChange={(e) => setNombrePrograma(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Solicitar Visita
              </button>
            </div>
          </form>
        </div>
      </div>

      {solicitudes.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-3">Solicitudes Realizadas</h3>
          <div className="card shadow-sm">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {solicitudes.map((solicitud, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h6 className="mb-1">{solicitud.nombre}</h6>
                      <small className="text-muted">
                        Ficha: {solicitud.numeroFicha} | Programa:{" "}
                        {solicitud.nombrePrograma}
                      </small>
                    </div>
                    <span className="badge bg-secondary rounded-pill">
                      {solicitud.fechaSolicitud}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitasAprendiz;
