import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

// Páginas comunes
import ForgotPassword from "../Pages/ForgotPassword";
import Login from "../Pages/Login";
import ResetPassword from "../Pages/ResetPassword";

// Layouts
import LayoutDash from "../Layout/LayaoutDash";

// Instructor Pages
import BitacorasInstructor from "../Pages/Instructor/Bitacoras";
import DashboardInstructor from "../Pages/Instructor/Dashboard";
import DocumentosInstructor from "../Pages/Instructor/Documentos";
import FichasInstructor from "../Pages/Instructor/Fichas";
import UsuariosInstructor from "../Pages/Instructor/Usuarios";
//import VisitasInstructor from "../Pages/Instructor/Visitas";

// Aprendiz Pages
import BitacorasAprendiz from "../Pages/Aprendiz/Bitacoras";
import DashboardAprendiz from "../Pages/Aprendiz/Dashboard";
import DocumentosAprendiz from "../Pages/Aprendiz/Documentos";
import FichasAprendiz from "../Pages/Aprendiz/Fichas";
import VisitasAprendiz from "../Pages/Aprendiz/Visitas";

// Admin Pages
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
        <LayoutDash />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <DashboardInstructor /> },
      { path: "home", element: <DashboardInstructor /> },
      { path: "fichas", element: <FichasInstructor /> },
      //{ path: "visitas", element: <VisitasInstructor /> },
      { path: "bitacoras", element: <BitacorasInstructor /> },
      { path: "documentos", element: <DocumentosInstructor /> },
      { path: "usuarios", element: <UsuariosInstructor /> },
    ],
  },
  {
    path: "/aprendiz",
    element: (
      <PrivateRoutes allowedRoles={["Aprendiz"]}>
        <LayoutDash />
      </PrivateRoutes>
    ),
    // ✅ INICIO DE LA SECCIÓN CORREGIDA
    children: [
      { index: true, element: <DashboardAprendiz /> },
      { path: "home", element: <DashboardAprendiz /> },
      {
        path: "fichas",
        element: <Outlet />,
        children: [
          // Lista general de fichas: /aprendiz/fichas
          { index: true, element: <FichasAprendiz /> },
          
          {
            path: ":idFicha",
            element: <Outlet />,
            children: [
              // Aquí se reutiliza el componente para mostrar detalle de la ficha
              { index: true, element: <FichasAprendiz /> },
      
              // Subrutas específicas
              { path: "visitas", element: <VisitasAprendiz /> },
              { path: "bitacoras", element: <BitacorasAprendiz /> },
              { path: "documentos", element: <DocumentosAprendiz /> },
            ],
          },
        ],
      },      
    ],
  },
  {
    path: "/administrador",
    element: (
      <PrivateRoutes allowedRoles={["Administrador"]}>
        <LayoutDash />
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