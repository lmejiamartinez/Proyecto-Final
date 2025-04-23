import { exportarExcel, exportarPDF } from "../../services/VisitasService";

export default function ReporteVisitas() {
  const descargar = async (tipo) => {
    const res = tipo === "pdf" ? await exportarPDF() : await exportarExcel();
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_visitas.${tipo}`;
    a.click();
  };

  return (
    <div>
      <button onClick={() => descargar("pdf")}>Descargar PDF</button>
      <button onClick={() => descargar("excel")}>Descargar Excel</button>
    </div>
  );
}
