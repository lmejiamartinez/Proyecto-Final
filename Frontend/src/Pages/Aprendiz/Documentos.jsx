import { faEdit, faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const documentosRequeridos = [
  "Carta Laboral de la empresa",
  "Certificado de prueba TyT para tecnólogo",
  "Certificado de registro en la Agencia Pública de empleo SENA",
  "Evidencia del carnet SENA destruido",
  "Formato de aprobación de Etapa Productiva",
];

const GestionDocumentos = () => {
  const [documentosSubidos, setDocumentosSubidos] = useState({});
  const [enlacesSubida, setEnlacesSubida] = useState({});
  const [documentoEditando, setDocumentoEditando] = useState(null);
  const [enlacesEdicion, setEnlacesEdicion] = useState({});

  useEffect(() => {
    // Simulación de carga de documentos subidos desde el backend
    const cargarDocumentos = async () => {
      // Reemplaza esto con tu llamada real a la API
      setTimeout(() => {
        setDocumentosSubidos({
          "Carta Laboral de la empresa": "https://ejemplo.com/carta_laboral",
          "Certificado de prueba TyT para tecnólogo": "https://ejemplo.com/tyt",
        });
        setEnlacesEdicion({
          "Carta Laboral de la empresa": "https://ejemplo.com/carta_laboral",
          "Certificado de prueba TyT para tecnólogo": "https://ejemplo.com/tyt",
        });
      }, 500);
    };

    cargarDocumentos();
  }, []);

  const handleSubirDocumento = (nombreDocumento, enlace) => {
    setEnlacesSubida({ ...enlacesSubida, [nombreDocumento]: enlace });
  };

  const handleSubmitSubida = async (event) => {
    event.preventDefault();
    // Aquí deberías enviar el objeto 'enlacesSubida' al backend para guardar los enlaces de los documentos
    console.log("Subiendo documentos:", enlacesSubida);
    // Simulación de guardado exitoso
    setDocumentosSubidos({ ...documentosSubidos, ...enlacesSubida });
    setEnlacesSubida({});
    alert("Documentos subidos exitosamente (simulado)");
  };

  const handleEditarDocumento = (nombreDocumento, enlaceActual) => {
    setDocumentoEditando(nombreDocumento);
    setEnlacesEdicion({ ...enlacesEdicion, [nombreDocumento]: enlaceActual });
  };

  const handleGuardarEdicion = async (nombreDocumento) => {
    // Aquí deberías enviar el 'enlacesEdicion[nombreDocumento]' al backend para actualizar el enlace del documento
    console.log(
      `Guardando edición de ${nombreDocumento}:`,
      enlacesEdicion[nombreDocumento]
    );
    // Simulación de guardado exitoso
    setDocumentosSubidos({
      ...documentosSubidos,
      [nombreDocumento]: enlacesEdicion[nombreDocumento],
    });
    setDocumentoEditando(null);
    alert(`${nombreDocumento} actualizado exitosamente (simulado)`);
  };

  const handleCancelarEdicion = () => {
    setDocumentoEditando(null);
    // Podrías resetear 'enlacesEdicion' si es necesario
  };

  const handleEliminarDocumento = async (nombreDocumento) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar el enlace de "${nombreDocumento}"?`
    );
    if (confirmacion) {
      // Aquí deberías hacer la llamada a tu backend para eliminar el enlace del documento
      console.log("Eliminando documento:", nombreDocumento);
      // Simulación de eliminación exitosa
      const nuevosDocumentosSubidos = { ...documentosSubidos };
      delete nuevosDocumentosSubidos[nombreDocumento];
      setDocumentosSubidos(nuevosDocumentosSubidos);
      alert(`${nombreDocumento} eliminado exitosamente (simulado)`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Documentos para Certificación</h2>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="text-center mb-3">
                Subir Documentos para Certificación
              </h3>
              <form onSubmit={handleSubmitSubida}>
                {documentosRequeridos.map((documento) => (
                  <div key={documento} className="mb-3">
                    <label
                      htmlFor={`enlace-${documento}`}
                      className="form-label"
                    >
                      <FontAwesomeIcon icon={faLink} className="me-2" />{" "}
                      {documento}:
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id={`enlace-${documento}`}
                      value={enlacesSubida[documento] || ""}
                      onChange={(e) =>
                        handleSubirDocumento(documento, e.target.value)
                      }
                      placeholder={`Enlace de ${documento}`}
                    />
                  </div>
                ))}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Subir Enlaces de Documentos
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-3">
                Documentos Subidos para Certificación
              </h3>
              {Object.keys(documentosSubidos).length > 0 ? (
                <ul className="list-group">
                  {Object.keys(documentosSubidos).map((documento) => (
                    <li
                      key={documento}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{documento}:</strong>{" "}
                        {documentoEditando === documento ? (
                          <input
                            type="url"
                            className="form-control form-control-sm"
                            value={enlacesEdicion[documento] || ""}
                            onChange={(e) =>
                              setEnlacesEdicion({
                                ...enlacesEdicion,
                                [documento]: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <a
                            href={documentosSubidos[documento]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {documentosSubidos[documento].length > 50
                              ? documentosSubidos[documento].substring(0, 50) +
                                "..."
                              : documentosSubidos[documento]}
                          </a>
                        )}
                      </div>
                      <div>
                        {documentoEditando === documento ? (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleGuardarEdicion(documento)}
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
                              onClick={() =>
                                handleEditarDocumento(
                                  documento,
                                  documentosSubidos[documento]
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faEdit} /> Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleEliminarDocumento(documento)}
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
                <p className="text-center">No se han subido documentos aún.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionDocumentos;
