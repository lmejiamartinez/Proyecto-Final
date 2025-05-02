import React, { useEffect, useState } from "react";

const BuscarUsuario = () => {
  const [nombreBusqueda, setNombreBusqueda] = useState("");
  const [documentoBusqueda, setDocumentoBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({});
  const [listarTodosActivo, setListarTodosActivo] = useState(false);
  const [cargandoLista, setCargandoLista] = useState(false);
  const [todosUsuarios, setTodosUsuarios] = useState([]);

  useEffect(() => {
    listarTodos();
  }, []);

  useEffect(() => {
    if (usuarioSeleccionado) {
      setFormData({ ...usuarioSeleccionado });
      setModoEdicion(true);
    } else {
      setFormData({});
      setModoEdicion(false);
    }
  }, [usuarioSeleccionado]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBuscar = async () => {
    setBuscando(true);
    setResultados([]);
    setUsuarioSeleccionado(null);
    setError("");
    setListarTodosActivo(false);
    setTodosUsuarios([]);

    try {
      const queryParams = new URLSearchParams();
      if (nombreBusqueda) {
        queryParams.append("nombre", nombreBusqueda);
      }
      if (documentoBusqueda) {
        queryParams.append("documento", documentoBusqueda);
      }

      const response = await fetch(
        `http://localhost:3001/api/usuarios/buscar?${queryParams.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setResultados(data);
      } else if (response.status === 404) {
        setError(
          "No se encontraron usuarios con los criterios proporcionados."
        );
      } else if (response.status === 400) {
        const errorData = await response.json();
        setError(errorData.mensaje);
      } else {
        setError("Error al buscar usuarios.");
      }
    } catch (error) {
      setError("Error de red al intentar buscar.");
    } finally {
      setBuscando(false);
    }
  };

  const listarTodos = async () => {
    setCargandoLista(true);
    setResultados([]);
    setUsuarioSeleccionado(null);
    setError("");
    setNombreBusqueda("");
    setDocumentoBusqueda("");
    setListarTodosActivo(true);

    try {
      const response = await fetch("http://localhost:3001/api/usuarios");
      if (response.ok) {
        const data = await response.json();
        setTodosUsuarios(data.usuarios || data);
      } else {
        setError("Error al listar todos los usuarios.");
      }
    } catch (error) {
      setError("Error de red al intentar listar todos los usuarios.");
    } finally {
      setCargandoLista(false);
    }
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/usuarios/${formData.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Usuario actualizado correctamente.");
        listarTodosActivo ? listarTodos() : handleBuscar();
        setUsuarioSeleccionado(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al actualizar el usuario.");
      }
    } catch (error) {
      setError("Error de red al intentar actualizar el usuario.");
    }
  };

  const handleEliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/usuarios/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Usuario eliminado correctamente.");
          listarTodosActivo ? listarTodos() : handleBuscar();
          setUsuarioSeleccionado(null);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Error al eliminar el usuario.");
        }
      } catch (error) {
        setError("Error de red al intentar eliminar el usuario.");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Gestionar Usuarios</h2>

      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Nombre del usuario"
          value={nombreBusqueda}
          onChange={(e) => setNombreBusqueda(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Número de documento"
          value={documentoBusqueda}
          onChange={(e) => setDocumentoBusqueda(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleBuscar} disabled={buscando} style={buttonStyle}>
          {buscando ? "Buscando..." : "Buscar"}
        </button>
        <button
          onClick={listarTodos}
          disabled={cargandoLista}
          style={buttonStyle}
        >
          {cargandoLista ? "Cargando..." : "Listar Todos"}
        </button>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      {cargandoLista && (
        <p style={{ textAlign: "center" }}>Cargando lista de usuarios...</p>
      )}

      {listarTodosActivo && todosUsuarios.length > 0 && (
        <div style={resultsContainerStyle}>
          <h3 style={resultsHeadingStyle}>Lista de Usuarios:</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Identificación</th>
                <th style={thStyle}>Tipo Doc.</th>
                <th style={thStyle}>Correo</th>
                <th style={thStyle}>Rol</th>
                <th style={thStyle}>Teléfono</th>
                <th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {todosUsuarios.map((usuario) => (
                <tr key={usuario.id_usuario} style={trStyle}>
                  <td style={tdStyle}>{usuario.id_usuario}</td>
                  <td style={tdStyle}>{usuario.nombre}</td>
                  <td style={tdStyle}>{usuario.identificacion}</td>
                  <td style={tdStyle}>{usuario.tipo_documento}</td>
                  <td style={tdStyle}>{usuario.correo}</td>
                  <td style={tdStyle}>{usuario.rol}</td>
                  <td style={tdStyle}>{usuario.telefono || "N/A"}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEditarUsuario(usuario)}
                      style={editButtonStyle}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminarUsuario(usuario.id_usuario)}
                      style={deleteButtonStyle}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!listarTodosActivo && resultados.length > 0 && (
        <div style={resultsContainerStyle}>
          <h3 style={resultsHeadingStyle}>Resultados de la Búsqueda:</h3>
          <ul style={resultsListStyle}>
            {resultados.map((usuario) => (
              <li key={usuario.id_usuario} style={listItemStyle}>
                <span>
                  {usuario.nombre} ({usuario.identificacion}) - {usuario.rol}
                </span>
                <div>
                  <button
                    onClick={() => handleEditarUsuario(usuario)}
                    style={editButtonStyle}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminarUsuario(usuario.id_usuario)}
                    style={deleteButtonStyle}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {modoEdicion && usuarioSeleccionado && (
        <div style={editFormContainerStyle}>
          <h3 style={editFormHeadingStyle}>Editar Usuario</h3>
          <div style={editFormFieldsStyle}>
            <div>
              <label style={labelStyle}>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Identificación:</label>
              <input
                type="text"
                name="identificacion"
                value={formData.identificacion || ""}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Tipo de Documento:</label>
              <select
                name="tipo_documento"
                value={formData.tipo_documento || "CC"}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="CC">CC</option>
                <option value="TI">TI</option>
                <option value="CE">CE</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Rol:</label>
              <select
                name="rol"
                value={formData.rol || "Aprendiz"}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="Aprendiz">Aprendiz</option>
                <option value="Instructor">Instructor</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono || ""}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Correo Electrónico:</label>
              <input
                type="email"
                name="correo"
                value={formData.correo || ""}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            {formData.rol === "Aprendiz" && (
              <>
                <div>
                  <label style={labelStyle}>Número de Ficha:</label>
                  <input
                    type="text"
                    name="numeroFicha"
                    value={formData.numeroFicha || ""}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Nombre del Programa:</label>
                  <input
                    type="text"
                    name="nombrePrograma"
                    value={formData.nombrePrograma || ""}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
              </>
            )}
            <button onClick={handleGuardarCambios} style={saveButtonStyle}>
              Guardar Cambios
            </button>
            <button
              onClick={() => setUsuarioSeleccionado(null)}
              style={cancelButtonStyle}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Estilos CSS en formato de objeto JavaScript
const containerStyle = {
  maxWidth: "90%",
  margin: "20px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};
const headingStyle = {
  textAlign: "center",
  color: "#333",
  marginBottom: "20px",
};
const searchContainerStyle = {
  display: "flex",
  gap: "15px",
  marginBottom: "15px",
};
const inputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  flexGrow: 1,
  color: "black",
  backgroundColor: "white",
};
const buttonStyle = {
  padding: "10px 15px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
};
const errorStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "10px",
  borderRadius: "4px",
  marginBottom: "15px",
};
const resultsContainerStyle = {
  marginBottom: "20px",
  border: "1px solid #eee",
  borderRadius: "4px",
  padding: "10px",
  overflowX: "auto",
};
const resultsHeadingStyle = { color: "#555", marginBottom: "10px" };
const resultsListStyle = { listStyleType: "none", padding: 0 };
const listItemStyle = {
  padding: "8px",
  borderBottom: "1px solid #f0f0f0",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const editButtonStyle = {
  marginLeft: "5px",
  padding: "5px 10px",
  borderRadius: "4px",
  border: "1px solid #007bff",
  backgroundColor: "white",
  color: "#007bff",
  cursor: "pointer",
};
const deleteButtonStyle = {
  marginLeft: "5px",
  padding: "5px 10px",
  borderRadius: "4px",
  border: "1px solid #dc3545",
  backgroundColor: "white",
  color: "#dc3545",
  cursor: "pointer",
};
const editFormContainerStyle = {
  border: "1px solid #eee",
  borderRadius: "4px",
  padding: "15px",
  backgroundColor: "#f9f9f9",
};
const editFormHeadingStyle = {
  color: "#555",
  marginBottom: "15px",
  textAlign: "center",
};
const editFormFieldsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
const labelStyle = {
  fontWeight: "bold",
  color: "#555",
  display: "block",
  marginBottom: "5px",
};
const saveButtonStyle = {
  padding: "10px 15px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#28a745",
  color: "white",
  cursor: "pointer",
  marginTop: "15px",
};
const cancelButtonStyle = {
  padding: "10px 15px",
  borderRadius: "4px",
  border: "1px solid #6c757d",
  backgroundColor: "white",
  color: "#6c757d",
  cursor: "pointer",
  marginTop: "10px",
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};
const thStyle = {
  backgroundColor: "#f2f2f2",
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};
const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};
const trStyle = {
  "&:nth-child(even)": { backgroundColor: "#f9f9f9" },
};

export default BuscarUsuario;
