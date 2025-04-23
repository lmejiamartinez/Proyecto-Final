import { useState } from "react";

export default function VisitaForm({ onGuardar, visitaActual }) {
  const [form, setForm] = useState(
    visitaActual || {
      fecha: "",
      hora: "",
      tipo: "Presencial",
      herramienta: "",
      ficha: "",
      aprendiz: "",
    }
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="fecha"
        type="date"
        onChange={handleChange}
        value={form.fecha}
        required
      />
      <input
        name="hora"
        type="time"
        onChange={handleChange}
        value={form.hora}
        required
      />
      <select name="tipo" onChange={handleChange} value={form.tipo}>
        <option value="Presencial">Presencial</option>
        <option value="Virtual">Virtual</option>
      </select>
      <input
        name="herramienta"
        placeholder="Herramienta"
        onChange={handleChange}
        value={form.herramienta}
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
