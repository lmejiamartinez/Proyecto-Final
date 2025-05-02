import { createBrowserRouter, Navigate } from "react-router-dom";

// Páginas comunes
import ForgotPassword from "../Pages/ForgotPassword";
import Login from "../Pages/Login";
import ResetPassword from "../Pages/ResetPassword";

// Layouts
import LayoutAdministrador from "../Layout/LayoutAdministrador";
import LayoutAprendiz from "../Layout/LayoutAprendiz";
import LayoutInstructor from "../Layout/LayoutInstructor";

// Instructor Pages
import BitacorasInstructor from "../Pages/Instructor/Bitacoras";
import DashboardInstructor from "../Pages/Instructor/Dashboard";
import DocumentosInstructor from "../Pages/Instructor/Documentos";
import FichasInstructor from "../Pages/Instructor/Fichas";
import UsuariosInstructor from "../Pages/Instructor/Usuarios";
import VisitasInstructor from "../Pages/Instructor/Visitas";

// Aprendiz Pages
import BitacorasAprendiz from "../Pages/Aprendiz/Bitacoras";
import DashboardAprendiz from "../Pages/Aprendiz/Dashboard";
import DocumentosAprendiz from "../Pages/Aprendiz/Documentos";
import FichasAprendiz from "../Pages/Aprendiz/Fichas";
import VisitasAprendiz from "../Pages/Aprendiz/Visitas";


//Admin Pages
import DashboardAdministrador from "../Pages/Admin/Dashboard";
import ListadoAdministrador from "../Pages/Admin/Listado";
import UsuariosAdministrador from "../Pages/Admin/Usuarios";

// Protegidas
import PrivateRoutes from "../Components/PrivateRoutes/PrivateRoutes";

const AppRoutes = createBrowserRouter([
  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "logout", element: <Navigate to="/" /> },
    ],
  },
  {
    path: "/instructor",
    element: (
      <PrivateRoutes allowedRoles={["Instructor"]}>
        <LayoutInstructor />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <DashboardInstructor /> },
      { path: "fichas", element: <FichasInstructor /> },
      { path: "fichas/:idficha/visitas", element: <VisitasInstructor /> },
      { path: "fichas/:idficha/bitacoras", element: <BitacorasInstructor /> },
      { path: "fichas/:idficha/documentos", element: <DocumentosInstructor /> },
      { path: "usuarios", element: <UsuariosInstructor /> },
    ],
  },
  {
    path: "/aprendiz",
    element: (
      <PrivateRoutes allowedRoles={["Aprendiz"]}>
        <LayoutAprendiz />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <DashboardAprendiz /> },
      { path: "fichas", element: <FichasAprendiz /> },
      { path: "fichas/:idficha/visitas", element: <VisitasAprendiz /> },
      { path: "fichas/:idficha/bitacoras", element: <BitacorasAprendiz /> },
      { path: "fichas/:idficha/fichas", element: <FichasAprendiz /> },
      { path: "fichas/:idficha/documentos", element: <DocumentosAprendiz /> },
    ],
  },
  {
    path: "/administrador",
    element: (
      <PrivateRoutes allowedRoles={["Administrador"]}>
        <LayoutAdministrador />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <DashboardAdministrador /> },
      { path: "usuarios", element: <UsuariosAdministrador /> },
      { path: "listado", element: <ListadoAdministrador /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" />,
  },
]);

export default AppRoutes;
