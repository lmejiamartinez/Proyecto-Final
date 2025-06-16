import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navigation from "./NavigationConfig";

// ✅ Navegación específica para fichas activas
const FichaNavigation = [
  { to: "bitacoras", classicon: "bi bi-file-text me-3", label: "Bitácoras" },
  { to: "visitas", classicon: "bi bi-calendar2-event me-3", label: "Visitas" },
  { to: "documentos", classicon: "bi bi-folder me-3", label: "Documentos" },
];

const Sidebar = () => {
  const { roleUsuario, fichaActiva, setFichaActiva, fichasUsuario } = useAuth();
  const navigate = useNavigate();

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

        {/* ✅ Selector de fichas */}
        {fichasUsuario?.length > 0 && (
          <div className="mb-4 px-2">
            <small className="text-muted">Fichas disponibles:</small>
            <ul className="nav flex-column mt-2">
              {fichasUsuario.map((ficha) => (
                <li key={ficha.id} className="nav-item mb-1">
                  <button
                    className={`btn btn-sm ${
                      fichaActiva === ficha.id
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    } w-100`}
                    onClick={() => seleccionarFicha(ficha.id)}
                  >
                    Ficha {ficha.numero}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Opciones de navegación si hay ficha activa */}
        {fichaActiva && (
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
