import React, { useState } from "react";

const Usuarios = () => {
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [rol, setRol] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroFicha, setNumeroFicha] = useState("");
  const [nombrePrograma, setNombrePrograma] = useState("");
  const [claveTemporal, setClaveTemporal] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const containerStyle = {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "30px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "25px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#555",
    marginBottom: "6px",
    fontSize: "0.95rem",
  };

  const inputStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    color: "#333",
    backgroundColor: "#fff",
  };

  const selectStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    color: "#333",
    backgroundColor: "#fff",
    appearance: "none",
    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23777' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.6rem center",
    backgroundSize: "1.2em 1.2em",
    paddingRight: "2rem",
  };

  const claveTemporalContainerStyle = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  };

  const claveTemporalInputStyle = {
    flexGrow: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    color: "#333",
    backgroundColor: "#eee",
  };

  const claveTemporalInfoStyle = {
    fontSize: "0.85rem",
    color: "#777",
    marginTop: "4px",
  };

  const buttonStyle = {
    padding: "10px 12px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#e0f2f7", // Un azul muy claro
    color: "#039be5", // Un azul más suave
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "background-color 0.2s ease-in-out",
  };

  const buttonHoverStyle = {
    backgroundColor: "#b2ebf2",
  };

  const submitButtonStyle = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#81c784", // Un verde más claro
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.2s ease-in-out",
  };

  const submitButtonDisabledStyle = {
    backgroundColor: "#ddd",
    color: "#777",
    cursor: "not-allowed",
  };

  const submitButtonHoverStyle = {
    backgroundColor: "#66bb6a",
  };

  const successStyle = {
    backgroundColor: "#e8f5e9",
    color: "#388e3c",
    padding: "12px",
    borderRadius: "4px",
    marginBottom: "15px",
    border: "1px solid #c8e6c9",
  };

  const errorStyle = {
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    padding: "12px",
    borderRadius: "4px",
    marginBottom: "15px",
    border: "1px solid #ef9a9a",
  };

  const generarClaveTemporal = (nombre, identificacion) => {
    const nombreParts = nombre.split(" ");
    const primerNombre = nombreParts[0] || "";
    const primerApellido = nombreParts.length > 1 ? nombreParts[1] : "";
    const ultimosCuatroDigitos = identificacion.slice(-4);
    return `${primerNombre.toLowerCase()}.${primerApellido.toLowerCase()}.${ultimosCuatroDigitos}`;
  };

  const handleGenerarClave = () => {
    const claveGenerada = generarClaveTemporal(nombre, identificacion);
    setClaveTemporal(claveGenerada);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMensaje("");
    setError("");

    const nuevoUsuario = {
      nombre,
      identificacion,
      rol,
      telefono,
      correo,
      tipo_documento: tipoDocumento,
      numeroFicha: rol === "Aprendiz" ? numeroFicha : "",
      nombrePrograma: rol === "Aprendiz" ? nombrePrograma : "",
      claveTemporal: claveTemporal,
    };

    try {
      const response = await fetch("http://localhost:3001/api/usuarios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        setMensaje("Usuario creado exitosamente. Se ha enviado una clave temporal al correo electrónico.");
        setError("");
        resetForm();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al crear usuario.");
        setMensaje("");
      }
    } catch (error) {
      setError("Error de red al intentar crear el usuario.");
      setMensaje("");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNombre("");
    setIdentificacion("");
    setRol("");
    setTelefono("");
    setCorreo("");
    setNumeroFicha("");
    setNombrePrograma("");
    setClaveTemporal("");
    setTipoDocumento("");
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Administración de Usuarios</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {mensaje && <div style={successStyle}>{mensaje}</div>}
        {error && <div style={errorStyle}>{error}</div>}

        <div style={formGroupStyle}>
          <label htmlFor="nombre" style={labelStyle}>Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="identificacion" style={labelStyle}>Número de Identificación:</label>
          <input type="text" id="identificacion" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} required style={inputStyle} />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="tipo_documento" style={labelStyle}>Tipo de Documento:</label>
          <select id="tipo_documento" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required style={selectStyle}>
            <option value="">Seleccionar Tipo</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="rol" style={labelStyle}>Rol:</label>
          <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)} required style={selectStyle}>
            <option value="">Seleccionar Rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Instructor">Instructor</option>
            <option value="Aprendiz">Aprendiz</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="telefono" style={labelStyle}>Teléfono:</label>
          <input type="tel" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={inputStyle} />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="correo" style={labelStyle}>Correo Electrónico:</label>
          <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required style={inputStyle} />
        </div>

        {rol === "Aprendiz" && (
          <>
            <div style={formGroupStyle}>
              <label htmlFor="numeroFicha" style={labelStyle}>Número de Ficha:</label>
              <input type="text" id="numeroFicha" value={numeroFicha} onChange={(e) => setNumeroFicha(e.target.value)} required style={inputStyle} />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="nombrePrograma" style={labelStyle}>Nombre del Programa:</label>
              <input type="text" id="nombrePrograma" value={nombrePrograma} onChange={(e) => setNombrePrograma(e.target.value)} required style={inputStyle} />
            </div>
          </>
        )}

        <div style={formGroupStyle}>
          <label htmlFor="claveTemporal" style={labelStyle}>Clave Temporal:</label>
          <div style={claveTemporalContainerStyle}>
            <input type="text" id="claveTemporal" value={claveTemporal} readOnly style={claveTemporalInputStyle} />
            <button type="button" onClick={handleGenerarClave} style={buttonStyle}>Generar Clave</button>
          </div>
          <p style={claveTemporalInfoStyle}>Esta clave se enviará al usuario por correo electrónico.</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={isLoading ? submitButtonDisabledStyle : submitButtonStyle}
          onMouseOver={(e) => !isLoading && Object.assign(e.currentTarget.style, submitButtonHoverStyle)}
          onMouseOut={(e) => !isLoading && Object.assign(e.currentTarget.style, submitButtonStyle)}
        >
          {isLoading ? "Creando..." : "Crear Usuario"}
        </button>
      </form>
      {/* ... (resto de tu componente Usuarios) ... */}
    </div>
  );
};

export default Usuarios;