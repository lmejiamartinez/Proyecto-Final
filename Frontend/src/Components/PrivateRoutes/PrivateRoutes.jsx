import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles, children }) => {
  const { isAuthenticated, roleUsuario, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si aún no se ha autenticado o no hay rol, redirige
  if (!isAuthenticated || !roleUsuario) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Verifica si el rol está permitido
  if (!allowedRoles.includes(roleUsuario)) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
