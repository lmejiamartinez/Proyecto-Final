import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const PrivateRoutes = ({ children, allowedRoles }) => {
  const { roleUsuario, loading } = useAuth();
  const location = useLocation(); // Para obtener la ubicación actual y redirigir después del login

  // Mientras se está cargando el estado de autenticación, mostramos un loader
  if (loading) return <h1>No hay datos suficiente</h1>; // Aquí puedes poner un mensaje de carga si prefieres

  // console.log('rol', roleUsuario, 'estado carga', loading )
  // Si no hay rol de usuario (no autenticado), redirige al login
  if (!roleUsuario) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Si el rol no está en la lista de roles permitidos, redirige a "no autorizado"
  if (!allowedRoles.includes(roleUsuario)) {
    
    return (
      <Navigate to={`/auth/login`} replace />
    );
  }

  // Si el usuario tiene el rol adecuado, renderiza el contenido de la ruta protegida
  return (
    <>
      {children}
    </>
  );
};

export default PrivateRoutes;