export default function VisitasTabla({ visitas, onEditar, onEliminar }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Tipo</th>
          <th>Herramienta</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {visitas.map((v) => (
          <tr key={v.id}>
            <td>{v.fecha}</td>
            <td>{v.hora}</td>
            <td>{v.tipo}</td>
            <td>{v.herramienta}</td>
            <td>
              <button onClick={() => onEditar(v)}>Editar</button>
              <button onClick={() => onEliminar(v.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
