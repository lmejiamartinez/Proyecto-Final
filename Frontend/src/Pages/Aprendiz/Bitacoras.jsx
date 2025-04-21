import {
  faCalendarAlt,
  faEdit,
  faLink,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const GestionBitacoras = () => {
  const [enlaceSubida, setEnlaceSubida] = useState("");
  const [fechaEntregaSubida, setFechaEntregaSubida] = useState("");
  const [bitacoras, setBitacoras] = useState([]);
  const [bitacoraEditando, setBitacoraEditando] = useState(null);
  const [enlaceEdicion, setEnlaceEdicion] = useState("");
  const [fechaEntregaEdicion, setFechaEntregaEdicion] = useState("");

  useEffect(() => {
    // Simulación de carga de bitácoras desde el backend
    const cargarBitacoras = async () => {
      // Reemplaza esto con tu llamada real a la API
      setTimeout(() => {
        setBitacoras([
          {
            id: 1,
            enlace: "https://ejemplo.territorium.com/bitacora/1",
            fechaEntrega: "2025-05-01",
          },
          {
            id: 2,
            enlace: "https://ejemplo.territorium.com/bitacora/2",
            fechaEntrega: "2025-05-08",
          },
        ]);
      }, 500);
    };

    cargarBitacoras();
  }, []);

  const handleSubirBitacora = async (event) => {
    event.preventDefault();
    // Aquí deberías enviar 'enlaceSubida' y 'fechaEntregaSubida' a tu backend para guardar
    console.log("Subiendo bitácora:", {
      enlace: enlaceSubida,
      fechaEntrega: fechaEntregaSubida,
    });
    // Simulación de guardado exitoso
    const nuevaBitacora = {
      id: Date.now(), // Simulación de ID generado por el servidor
      enlace: enlaceSubida,
      fechaEntrega: fechaEntregaSubida,
    };
    setBitacoras([...bitacoras, nuevaBitacora]);
    setEnlaceSubida("");
    setFechaEntregaSubida("");
    alert("Bitácora subida exitosamente (simulado)");
  };

  const handleEditarBitacora = (bitacora) => {
    setBitacoraEditando(bitacora.id);
    setEnlaceEdicion(bitacora.enlace);
    setFechaEntregaEdicion(bitacora.fechaEntrega);
  };

  const handleGuardarEdicion = async () => {
    // Aquí deberías enviar 'enlaceEdicion' y 'fechaEntregaEdicion' a tu backend para actualizar la bitácora con ID 'bitacoraEditando'
    console.log("Guardando edición de bitácora:", {
      id: bitacoraEditando,
      enlace: enlaceEdicion,
      fechaEntrega: fechaEntregaEdicion,
    });
    // Simulación de guardado exitoso
    const nuevasBitacoras = bitacoras.map((bitacora) =>
      bitacora.id === bitacoraEditando
        ? {
            ...bitacora,
            enlace: enlaceEdicion,
            fechaEntrega: fechaEntregaEdicion,
          }
        : bitacora
    );
    setBitacoras(nuevasBitacoras);
    setBitacoraEditando(null);
    alert("Bitácora actualizada exitosamente (simulado)");
  };

  const handleCancelarEdicion = () => {
    setBitacoraEditando(null);
  };

  const handleEliminarBitacora = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta bitácora?"
    );
    if (confirmacion) {
      // Aquí deberías hacer la llamada a tu backend para eliminar la bitácora con el 'id'
      console.log("Eliminando bitácora con ID:", id);
      // Simulación de eliminación exitosa
      const nuevasBitacoras = bitacoras.filter(
        (bitacora) => bitacora.id !== id
      );
      setBitacoras(nuevasBitacoras);
      alert("Bitácora eliminada exitosamente (simulado)");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Bitácoras</h2>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          {" "}
          {/* Centramos y le damos un ancho mayor */}
          {/* Formulario para Subir Bitácora */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="text-center mb-3">Subir Bitácora</h3>
              <form onSubmit={handleSubirBitacora} className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="enlaceSubida" className="form-label">
                    <FontAwesomeIcon icon={faLink} className="me-2" /> Enlace de
                    la Bitácora:
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="enlaceSubida"
                    value={enlaceSubida}
                    onChange={(e) => setEnlaceSubida(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="fechaEntregaSubida" className="form-label">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />{" "}
                    Fecha de Entrega:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaEntregaSubida"
                    value={fechaEntregaSubida}
                    onChange={(e) => setFechaEntregaSubida(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary">
                    Subir Bitácora
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Lista de Bitácoras */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-3">Bitácoras Entregadas</h3>
              {bitacoras.length > 0 ? (
                <ul className="list-group">
                  {bitacoras.map((bitacora) => (
                    <li
                      key={bitacora.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>Enlace:</strong>{" "}
                        {bitacoraEditando === bitacora.id ? (
                          <input
                            type="url"
                            className="form-control form-control-sm"
                            value={enlaceEdicion}
                            onChange={(e) => setEnlaceEdicion(e.target.value)}
                          />
                        ) : (
                          <a
                            href={bitacora.enlace}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {bitacora.enlace.length > 50
                              ? bitacora.enlace.substring(0, 50) + "..."
                              : bitacora.enlace}
                          </a>
                        )}
                        <br />
                        <strong>Fecha de Entrega:</strong>{" "}
                        {bitacoraEditando === bitacora.id ? (
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            value={fechaEntregaEdicion}
                            onChange={(e) =>
                              setFechaEntregaEdicion(e.target.value)
                            }
                          />
                        ) : (
                          bitacora.fechaEntrega
                        )}
                      </div>
                      <div>
                        {bitacoraEditando === bitacora.id ? (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={handleGuardarEdicion}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Guardar
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={handleCancelarEdicion}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEditarBitacora(bitacora)}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleEliminarBitacora(bitacora.id)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} /> Eliminar
                            </button>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No hay bitácoras entregadas aún.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionBitacoras;
