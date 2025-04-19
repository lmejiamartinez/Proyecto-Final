import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";

const localizer = momentLocalizer(moment);

const Visitas = () => {
  const [nuevaVisita, setNuevaVisita] = useState({
    id: uuidv4(),
    fechaHora: new Date(),
    numeroVisita: 1,
    tipoVisita: "presencial",
    herramientaReunion: "",
  });

  const [visitasAgendadas, setVisitasAgendadas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [visitaAEditar, setVisitaAEditar] = useState(null);

  useEffect(() => {
    // Aquí podrías cargar las visitas desde tu base de datos
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaVisita((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setNuevaVisita((prevState) => ({
      ...prevState,
      fechaHora: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEdicion && visitaAEditar) {
      // Editar visita existente
      const nuevasVisitas = visitasAgendadas.map((visita) =>
        visita.id === visitaAEditar.id ? nuevaVisita : visita
      );
      setVisitasAgendadas(nuevasVisitas);
      setModoEdicion(false);
      setVisitaAEditar(null);
      alert("Visita actualizada!");
    } else {
      // Agendar nueva visita
      setVisitasAgendadas([...visitasAgendadas, nuevaVisita]);
      alert("Visita agendada!");
    }
    setNuevaVisita({
      id: uuidv4(),
      fechaHora: new Date(),
      numeroVisita: visitasAgendadas.length + 2,
      tipoVisita: "presencial",
      herramientaReunion: "",
    });
    setMostrarFormulario(false);
  };

  const handleMostrarFormulario = () => {
    setMostrarFormulario(true);
    setModoEdicion(false);
    setVisitaAEditar(null);
    setNuevaVisita({
      id: uuidv4(),
      fechaHora: new Date(),
      numeroVisita: visitasAgendadas.length + 1,
      tipoVisita: "presencial",
      herramientaReunion: "",
    });
  };

  const handleEditarVisita = (visita) => {
    setMostrarFormulario(true);
    setModoEdicion(true);
    setVisitaAEditar(visita);
    setNuevaVisita({ ...visita }); // Precarga el formulario con los datos de la visita
  };

  const handleEliminarVisita = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta visita?")) {
      const nuevasVisitas = visitasAgendadas.filter(
        (visita) => visita.id !== id
      );
      setVisitasAgendadas(nuevasVisitas);
      alert("Visita eliminada!");
    }
  };

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false);
    setModoEdicion(false);
    setVisitaAEditar(null);
    setNuevaVisita({
      id: uuidv4(),
      fechaHora: new Date(),
      numeroVisita: visitasAgendadas.length + 1,
      tipoVisita: "presencial",
      herramientaReunion: "",
    });
  };

  const eventosCalendario = visitasAgendadas.map((visita) => ({
    id: visita.id,
    title: `Visita #${visita.numeroVisita} (${visita.tipoVisita})`,
    start: visita.fechaHora,
    end: moment(visita.fechaHora).add(1, "hour").toDate(),
    allDay: false,
    resource: {
      tipo: visita.tipoVisita,
      herramienta: visita.herramientaReunion,
    },
  }));

  return (
    <div>
      <style>
        {`
          /* ... tus estilos anteriores ... */
        `}
      </style>
      <h2>Calendario de Visitas</h2>
      <div style={{ height: 500, marginBottom: 20 }}>
        <Calendar
          localizer={localizer}
          events={eventosCalendario}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
        />
      </div>

      {!mostrarFormulario && (
        <button
          className="btn btn-success mb-3"
          onClick={handleMostrarFormulario}
          style={{ marginLeft: "20px" }}
        >
          <i className="bi bi-plus-circle me-2"></i> Agendar Visita
        </button>
      )}

      {mostrarFormulario && (
        <div>
          <h2>{modoEdicion ? "Editar Visita" : "Agendar Nueva Visita"}</h2>
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label htmlFor="fechaHora" className="form-label">
                Fecha y Hora de Visita:
              </label>
              <DatePicker
                id="fechaHora"
                selected={nuevaVisita.fechaHora}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="dd/MM/yyyy hh:mm aa"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numeroVisita" className="form-label">
                Número de Visita:
              </label>
              <input
                type="number"
                className="form-control"
                id="numeroVisita"
                name="numeroVisita"
                value={nuevaVisita.numeroVisita}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipoVisita" className="form-label">
                Tipo de Visita:
              </label>
              <select
                className="form-select"
                id="tipoVisita"
                name="tipoVisita"
                value={nuevaVisita.tipoVisita}
                onChange={handleChange}
              >
                <option value="presencial">Presencial</option>
                <option value="telefónica">Telefónica</option>
                <option value="virtual">Virtual</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="herramientaReunion" className="form-label">
                Herramienta de la Reunión (Opcional):
              </label>
              <input
                type="text"
                className="form-control"
                id="herramientaReunion"
                name="herramientaReunion"
                value={nuevaVisita.herramientaReunion}
                onChange={handleChange}
                placeholder="Teams, Meet, etc."
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">
              {modoEdicion ? "Guardar Cambios" : "Agendar Visita"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelarFormulario}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {visitasAgendadas.length > 0 && !mostrarFormulario && (
        <div className="mt-4">
          <h2>Lista de Visitas Agendadas</h2>
          <ul className="list-group">
            {visitasAgendadas.map((visita) => (
              <li
                key={visita.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong className="me-2">Fecha:</strong>{" "}
                  {visita.fechaHora.toLocaleDateString()}
                  <strong className="ms-3 me-2">Hora:</strong>{" "}
                  {visita.fechaHora.toLocaleTimeString()}
                  <strong className="ms-3 me-2">Número:</strong>{" "}
                  {visita.numeroVisita}
                  <strong className="ms-3 me-2">Tipo:</strong>{" "}
                  <span
                    className={`badge bg-${
                      visita.tipoVisita === "presencial"
                        ? "primary"
                        : visita.tipoVisita === "telefónica"
                        ? "info"
                        : "secondary"
                    }`}
                  >
                    {visita.tipoVisita}
                  </span>
                  {visita.herramientaReunion && (
                    <span className="ms-3">
                      <strong className="me-2">Herramienta:</strong>{" "}
                      <span className="text-muted">
                        {visita.herramientaReunion}
                      </span>
                    </span>
                  )}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditarVisita(visita)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminarVisita(visita.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Visitas;
