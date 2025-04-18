import React, { useState } from "react";
import { BiBook, BiEnvelope, BiPhone, BiUser } from "react-icons/bi"; // Importa iconos

const Dashboard = () => {
  const [instructorInfo, setInstructorInfo] = useState({
    nombre: "Nombre del Instructor",
    email: "instructor@sena.edu.co",
    telefono: "123 456 7890",
    curso: "Nombre del Curso",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructorInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Información guardada:", instructorInfo);
  };

  return (
    <div>
      <h2>Bienvenida, Nombre Instructor</h2>
      <p>Aquí irá el contenido de tu sistema.</p>

      {/* Recuadro de información del instructor - Nuevo diseño */}
      <div className="mt-4 p-3 border rounded bg-white shadow-sm">
        <h3>Información del Instructor</h3>
        {isEditing ? (
          <div>
            <div className="mb-2">
              <label htmlFor="nombre" className="form-label">
                <BiUser className="me-2" /> Nombre:
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="nombre"
                name="nombre"
                value={instructorInfo.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                <BiEnvelope className="me-2" /> Email:
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                name="email"
                value={instructorInfo.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="telefono" className="form-label">
                <BiPhone className="me-2" /> Teléfono:
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="telefono"
                name="telefono"
                value={instructorInfo.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="curso" className="form-label">
                <BiBook className="me-2" /> Curso:
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="curso"
                name="curso"
                value={instructorInfo.curso}
                onChange={handleChange}
              />
            </div>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={handleSaveClick}
            >
              Guardar
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div>
            <p>
              <BiUser className="me-2" /> <strong>Nombre:</strong>{" "}
              {instructorInfo.nombre}
            </p>
            <p>
              <BiEnvelope className="me-2" /> <strong>Email:</strong>{" "}
              {instructorInfo.email}
            </p>
            <p>
              <BiPhone className="me-2" /> <strong>Teléfono:</strong>{" "}
              {instructorInfo.telefono}
            </p>
            <p>
              <BiBook className="me-2" /> <strong>Curso:</strong>{" "}
              {instructorInfo.curso}
            </p>
            <button
              className="btn btn-sm btn-warning "
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
