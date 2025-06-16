import {
  faEnvelope,
  faFile,
  faIdCard,
  faPhone,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { apiClientAxios } from "../../services/Axios";

const PerfilInstructor = () => {
  const [instructorInfo, setInstructorInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    identificacion: "",
    tipo_documento: "",
    telefono: "",
  });

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const res = await apiClientAxios.get("/auth/perfil", {
          withCredentials: true,
        });
        setInstructorInfo(res.data.usuario);
        setFormData({
          nombre: res.data.usuario.nombre || "",
          correo: res.data.usuario.correo || "",
          identificacion: res.data.usuario.identificacion || "",
          tipo_documento: res.data.usuario.tipo_documento || "",
          telefono: res.data.usuario.telefono || "",
        });
      } catch (error) {
        console.error("Error al obtener el perfil del instructor:", error);
      }
    };

    obtenerPerfil();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarCambios = async () => {
    try {
      const res = await apiClientAxios.put("/auth/instructor", formData, {
        withCredentials: true,
      });
      setInstructorInfo(res.data.usuarioActualizado);

      setModalVisible(false);
    } catch (error) {
      console.error("Error al actualizar la información:", error);
    }
  };

  if (!instructorInfo) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando información del instructor...</p>
      </div>
    );
  }

  return (
    <div
      className="container mt-5 mb-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="bg-light p-4 shadow mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <div className="d-flex align-items-center mb-4">
          <div
            className="rounded-circle d-flex justify-content-center align-items-center me-4"
            style={{
              width: "100px",
              height: "100px",
              color: "#fff",
              fontSize: "3rem",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              background: "#70b22d",
            }}
          >
            <FontAwesomeIcon icon={faUserTie} />
          </div>
          <div>
            <h4 className="mb-0 fw-semibold">{instructorInfo.nombre}</h4>
            <span className="text-muted">Instructor</span>
          </div>
        </div>

        <div className="mb-3">
          <FontAwesomeIcon
            icon={faUserTie}
            className="me-2 "
            style={{ color: "#70b22d" }}
          />
          <strong>Nombre:</strong> {instructorInfo.nombre}
        </div>
        <div className="mb-3">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="me-2 "
            style={{ color: "#70b22d" }}
          />
          <strong>Correo Electrónico:</strong> {instructorInfo.correo}
        </div>
        <div className="mb-3">
          <FontAwesomeIcon
            icon={faFile}
            className="me-3 "
            style={{ color: "#70b22d" }}
          />
          <strong> Identificación:</strong> {instructorInfo.identificacion}
        </div>
        <div className="mb-3">
          <FontAwesomeIcon
            icon={faIdCard}
            className="me-2 "
            style={{ color: "#70b22d" }}
          />
          <strong>Tipo de documento:</strong> {instructorInfo.tipo_documento}
        </div>
        <div className="mb-3">
          <FontAwesomeIcon
            icon={faPhone}
            className="me-2 "
            style={{ color: "#70b22d" }}
          />
          <strong>Teléfono:</strong> {instructorInfo.telefono}
        </div>
        <div className="text-end">
          <button
            className="btn btn-outline"
            style={{ background: "#70b22d", color: "white" }}
            onClick={() => setModalVisible(true)}
          >
            <FontAwesomeIcon className="me-2" />
            Editar
          </button>
        </div>
      </div>

      {/* Modal de edición */}
      {modalVisible && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title">Editar Información</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                {[
                  "nombre",
                  "correo",
                  "identificacion",
                  "tipo_documento",
                  "telefono",
                ].map((campo) => (
                  <div className="mb-3" key={campo}>
                    <label className="form-label text-capitalize">
                      {campo.replace("_", " ")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name={campo}
                      value={formData[campo]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => setModalVisible(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleGuardarCambios}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilInstructor;
