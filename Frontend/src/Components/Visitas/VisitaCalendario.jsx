import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useMemo } from "react";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = { es: () => es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => new Date(),
  getDay: (d) => d.getDay(),
  locales,
});

export default function VisitasCalendario({ visitas }) {
  const eventos = useMemo(
    () =>
      visitas.map((v) => ({
        title: `${v.tipo} - ${v.herramienta || "sin herramienta"}`,
        start: new Date(`${v.fecha}T${v.hora}`),
        end: new Date(`${v.fecha}T${v.hora}`),
      })),
    [visitas]
  );

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        views={["month", "agenda"]}
      />
    </div>
  );
}
