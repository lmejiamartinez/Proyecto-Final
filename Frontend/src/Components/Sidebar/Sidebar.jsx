import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Navigation from "./NavigationConfig";

const FichaNavigation = [
  { to: "visitas", classicon: "bi bi-calendar2-event me-3", label: "Visitas" },
  { to: "bitacoras", classicon: "bi bi-file-text me-3", label: "Bitácoras" },
  { to: "documentos", classicon: "bi bi-folder me-3", label: "Documentos" },
  { to: "usuarios", classicon: "bi bi-people me-3", label: "Usuarios" },
];

const Sidebar = () => {
  const { idFicha } = useParams(); // 👈 ID desde la URL
  const { roleUsuario, fichaActiva, setFichaActiva } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (idFicha && idFicha !== fichaActiva) {
      setFichaActiva(idFicha); // 👈 sincroniza el contexto si se navega directamente por URL
    }
  }, [idFicha]);

  if (!roleUsuario) return null;

  const capitalizedRole =
    roleUsuario.charAt(0).toUpperCase() + roleUsuario.slice(1);

  const seleccionarFicha = (fichaId) => {
    setFichaActiva(fichaId);
    navigate(`/${roleUsuario}/fichas/${fichaId}`);
  };

  return (
    <div
      className="bg-light text-black p-3 shadow d-flex flex-column"
      style={{
        width: "250px",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      <ul className="nav flex-column mt-3" style={{ flexGrow: 1 }}>
        <li className="nav-item mb-5">
          <NavLink to="home" className="nav-link text-black">
            <i className="bi bi-house me-3"></i>
            {capitalizedRole}
          </NavLink>
          <hr className="mt-2" />
        </li>

        {/* Menú principal */}
        {Navigation[roleUsuario]?.map((item) => (
          <li className="nav-item mb-4" key={item.to}>
            <NavLink to={item.to} className="nav-link text-black mb-3">
              <i className={item.classicon}></i>
              {item.label}
            </NavLink>
          </li>
        ))}

        {/* Opciones específicas de ficha activa */}
        {(roleUsuario === "Instructor" || roleUsuario === "Aprendiz") &&
          fichaActiva && (
            <>
              {FichaNavigation.map((item) => (
                <li className="nav-item mb-3" key={item.to}>
                  <NavLink
                    to={`/${roleUsuario}/fichas/${fichaActiva}/${item.to}`}
                    className="nav-link text-black mb-5"
                  >
                    <i className={item.classicon}></i>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </>
          )}
      </ul>

      {/* Botón Salir */}
      <hr className="mt-4 mb-2" />
      <div className="mt-auto">
        <li className="nav-item pt-3 mb-2" style={{ listStyleType: "none" }}>
          <NavLink
            to="/"
            className="nav-link text-black d-flex align-items-center"
          >
            <i className="bi bi-arrow-left-circle me-3"></i>
            Salir
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
