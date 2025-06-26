import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // 👈 importante

const SubirBitacora = () => {


  const { idFichaAprendiz } = useAuth(); // 👈 usamos el contexto aquí
  console.log("idFichaAprendiz activo:", idFichaAprendiz);
  const [formulario, setFormulario] = useState({
    num_bitacora: "",
    descripcion: "",
    archivo: null,
    fecha: "",
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [bitacoras, setBitacoras] = useState([]);
  const [errorBitacoras, setErrorBitacoras] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idBitacoraEditando, setIdBitacoraEditando] = useState(null);

  const eliminarBitacora = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/bitacoras/${id}`);
      setBitacoras((prev) => prev.filter((b) => b.id_bitacoras !== id));
      setMensaje({
        texto: "Bitácora eliminada correctamente.",
        tipo: "success",
      });
    } catch (error) {
      console.error("Error al eliminar la bitácora:", error);
    }
  };

  useEffect(() => {
    const ahora = new Date();
    const fechaFormateada = ahora.toISOString().split("T")[0];
    setFormulario((prev) => ({ ...prev, fecha: fechaFormateada }));
  }, []);

  const obtenerBitacoras = () => {
    if (!idFichaAprendiz) return;

    axios
      .get(`http://localhost:3001/api/bitacoras/${idFichaAprendiz}`)
      .then((res) => {
        setBitacoras(res.data);
        setErrorBitacoras("");
      })
      .catch((err) => {
        console.error("Error al obtener las bitácoras:", err);
        setErrorBitacoras("Error al cargar las bitácoras");
      });
  };

  useEffect(() => {
    obtenerBitacoras();
  }, [idFichaAprendiz]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleArchivo = (e) => {
    setFormulario({ ...formulario, archivo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ texto: "", tipo: "" });

    if (!idFichaAprendiz) {
      setMensaje({
        texto: "Error: No se ha seleccionado una ficha de aprendiz.",
        tipo: "danger",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id_ficha_aprendiz", idFichaAprendiz);
      formData.append("num_bitacora", formulario.num_bitacora);
      formData.append("descripcion", formulario.descripcion);
      formData.append("archivo", formulario.archivo);
      formData.append("fecha", formulario.fecha);

      if (modoEdicion && idBitacoraEditando) {
        await axios.put(
          `http://localhost:3001/api/bitacoras/${idBitacoraEditando}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMensaje({
          texto: "Bitácora actualizada correctamente.",
          tipo: "success",
        });
      } else {
        await axios.post(
          "http://localhost:3001/api/bitacoras/archivo",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMensaje({
          texto: "Bitácora subida correctamente.",
          tipo: "success",
        });
      }

      setFormulario({
        num_bitacora: "",
        descripcion: "",
        archivo: null,
        fecha: formulario.fecha,
      });
      setModoEdicion(false);
      setIdBitacoraEditando(null);
      document.querySelector('input[type="file"]').value = "";
      obtenerBitacoras();
    } catch (error) {
      console.error("Error al guardar la bitácora:", error);
      const errorMsg =
        error.response?.data?.mensaje || "Ocurrió un error inesperado.";
      setMensaje({ texto: errorMsg, tipo: "danger" });
    }
  };

  const manejarEdicion = (bitacora) => {
    setFormulario({
      num_bitacora: bitacora.num_bitacora,
      descripcion: bitacora.descripcion,
      archivo: null,
      fecha: bitacora.fecha.split("T")[0],
    });
    setModoEdicion(true);
    setIdBitacoraEditando(bitacora.id_bitacoras);
    setMensaje({ texto: "", tipo: "" });
  };

  return (
    <div className="container mt-4">
      <h3>Subir Bitácora</h3>
      <form onSubmit={handleSubmit}>
        {mensaje.texto && (
          <div className={`alert alert-${mensaje.tipo}`} role="alert">
            {mensaje.texto}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Número de Bitácora</label>
          <input
            type="number"
            name="num_bitacora"
            className="form-control"
            value={formulario.num_bitacora}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={formulario.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={formulario.fecha}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Archivo PDF</label>
          <input
            type="file"
            name="archivo"
            accept=".pdf"
            className="form-control"
            onChange={handleArchivo}
            required={!modoEdicion}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {modoEdicion ? "Actualizar Bitácora" : "Subir Bitácora"}
        </button>
        {modoEdicion && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setFormulario({
                num_bitacora: "",
                descripcion: "",
                archivo: null,
                fecha: formulario.fecha,
              });
              setModoEdicion(false);
              setIdBitacoraEditando(null);
              setMensaje({ texto: "Edición cancelada", tipo: "info" });
              document.querySelector('input[type="file"]').value = "";
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h4 className="mt-4">Bitácoras Subidas</h4>
      {errorBitacoras && (
        <div className="alert alert-danger">{errorBitacoras}</div>
      )}
      {bitacoras.length === 0 ? (
        <p>No hay bitácoras registradas.</p>
      ) : (
        <>
          <p>
            Total: <strong>{bitacoras.length}</strong>
          </p>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Num_bitacora</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Archivo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bitacoras.map((b) => (
                <tr key={b.id_bitacoras}>
                  <td>{b.num_bitacora}</td>
                  <td>{b.descripcion}</td>
                  <td>{new Date(b.fecha).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={`http://localhost:3001/uploads/bitacoras/${b.archivo}`}
                      download={b.nombre}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {b.nombre}
                    </a>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => manejarEdicion(b)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => eliminarBitacora(b.id_bitacoras)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SubirBitacora;
