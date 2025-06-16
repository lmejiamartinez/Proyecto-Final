const Navigation = {
  Instructor: [
    { to: "fichas", classicon: "bi bi-grid me-3", label: "Fichas" },
    // {
    //   to: "visitas",
    //   classicon: "bi bi-calendar2-event me-3",
    //   label: "Visitas",
    // },
    // { to: "bitacoras", classicon: "bi bi-file-text me-3 ", label: "Bitacoras" },
    // { to: "documentos", classicon: "bi bi-folder me-3", label: "Documentos" },
  ],
  Aprendiz: [
    { to: "fichas", classicon: "bi bi-grid me-3", label: "Fichas" },
    // {
    //   to: "visitas",
    //   classicon: "bi bi-calendar2-event me-3",
    //   label: "Visitas",
    // },
    // { to: "bitacoras", classicon: "bi bi-file-text me-3 ", label: "Bitacoras" },
    // { to: "documentos", classicon: "bi bi-folder me-3", label: "Documentos" },
  ],

  Administrador: [
    { to: "listado", classicon: "bi bi-file-text me-3 ", label: "Listado" },
    {
      to: "usuarios",
      classicon: "bi bi-calendar2-event me-3",
      label: "Usuarios",
    },
  ],
};
export default Navigation;
