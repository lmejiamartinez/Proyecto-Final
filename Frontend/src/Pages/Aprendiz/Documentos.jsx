import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const tiposDocumentos = [
  { tipo: "Carta Laboral", campo: "carta_laboral" },
  { tipo: "Certificado prueba TyT", campo: "certificado_tyt" },
  { tipo: "Certificado Agencia Pública", campo: "certificado_agencia" },
  { tipo: "Carnet Destruido", campo: "carnet_destruido" },
  { tipo: "Formato Aprobación", campo: "formato_aprobacion" },
];

const SubirDocumentos = () => {
  const { idFichaAprendiz } = useAuth();
  const [archivos, setArchivos] = useState({});
  const [documentos, setDocumentos] = useState([]);
  const [documentoEditando, setDocumentoEditando] = useState(null);
  const [archivoNuevo, setArchivoNuevo] = useState(null);

  const handleFileChange = (e, campo) => {
    setArchivos((prev) => ({ ...prev, [campo]: e.target.files[0] }));
  };

  const obtenerDocumentos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/documentos/ficha/${idFichaAprendiz}`
      );
      setDocumentos(res.data);
    } catch (err) {
      console.error("Error al cargar documentos", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fecha = new Date().toISOString().slice(0, 10);

    if (!idFichaAprendiz) {
      alert("⚠️ No se ha cargado el ID de la ficha del aprendiz.");
      return;
    }

    let archivosSubidos = false;

    try {
      for (const doc of tiposDocumentos) {
        const file = archivos[doc.campo];
        if (!file) continue;

        archivosSubidos = true;

        const formData = new FormData();
        formData.append("archivo", file);
        formData.append("id_ficha_aprendiz", idFichaAprendiz);
        formData.append("tipo_documento", doc.tipo);
        formData.append("nombre", doc.tipo);
        formData.append("descripcion", `Subido: ${doc.tipo}`);
        formData.append("fecha", fecha);
        formData.append("num_documento", Math.floor(Math.random() * 100000));

        await axios.post(
          "http://localhost:3001/api/documentos/archivo",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      if (archivosSubidos) {
        alert("Documentos subidos correctamente");
        setArchivos({});
        obtenerDocumentos(); // recargar la tabla
      } else {
        alert("⚠️ No seleccionaste ningún archivo para subir.");
      }
    } catch (error) {
      console.error("Error al subir documentos", error);
      alert("Error al subir documentos");
    }
  };

  const eliminarDocumento = async (id) => {
    if (!window.confirm("¿Deseas eliminar este documento?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/documentos/${id}`);
      obtenerDocumentos();
    } catch (error) {
      console.error("Error al eliminar documento", error);
      alert("No se pudo eliminar el documento");
    }
  };

  const handleArchivoNuevoChange = (e) => {
    setArchivoNuevo(e.target.files[0]);
  };

  const actualizarDocumento = async () => {
    if (!archivoNuevo || !documentoEditando) {
      alert("Selecciona un archivo para actualizar.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivoNuevo);
    formData.append("fecha", new Date().toISOString().slice(0, 10));
    formData.append("descripcion", "Documento actualizado");

    try {
      await axios.put(
        `http://localhost:3001/api/documentos/archivo/${documentoEditando}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Documento actualizado correctamente");
      setDocumentoEditando(null);
      setArchivoNuevo(null);
      obtenerDocumentos();
    } catch (error) {
      console.error("Error al actualizar documento", error);
      alert("No se pudo actualizar el documento.");
    }
  };

  useEffect(() => {
    if (idFichaAprendiz) {
      obtenerDocumentos();
    }
  }, [idFichaAprendiz]);

  return (
    <div className="container mt-4">
      <h2>Subir Documentos (PDF)</h2>
      <form onSubmit={handleSubmit}>
        {tiposDocumentos.map((doc) => (
          <div className="mb-3" key={doc.campo}>
            <label className="form-label">{doc.tipo}</label>
            <input
              type="file"
              accept="application/pdf"
              className="form-control"
              onChange={(e) => handleFileChange(e, doc.campo)}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success">
          Subir
        </button>
      </form>

      <hr className="my-4" />

      <h3>Mis Documentos Subidos</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((doc) => (
            <tr key={doc.id_documento}>
              <td>{doc.nombre}</td>
              <td>{new Date(doc.fecha).toLocaleDateString()}</td>
              <td>{doc.descripcion}</td>
              <td>
                <a
                  href={`http://localhost:3001/uploads/documentos/${doc.archivo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver
                </a>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => eliminarDocumento(doc.id_documento)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => setDocumentoEditando(doc.id_documento)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
          {documentos.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No hay documentos aún
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {documentoEditando && (
        <div className="mt-4">
          <h4>Actualizar Documento</h4>
          <input
            type="file"
            accept="application/pdf"
            className="form-control mb-2"
            onChange={handleArchivoNuevoChange}
          />
          <button className="btn btn-primary me-2" onClick={actualizarDocumento}>
            Confirmar actualización
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setDocumentoEditando(null);
              setArchivoNuevo(null);
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default SubirDocumentos;
