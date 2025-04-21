import {
    createBrowserRouter,
    Navigate,
  } from "react-router-dom";
  
  // Páginas comunes
  import ForgotPassword from "../Pages/ForgotPassword";
  import ResetPassword from "../Pages/ResetePassword";
  import Login from "../Pages/Login";
  
  // Layouts
  import LayoutAprendiz from "../Layout/LayoutAprendiz";
  import LayoutInstructor from "../Layout/LayoutInstructor";
  
  // Instructor Pages
  import BitacorasInstructor from "../Pages/Instructor/Bitacoras";
  import DashboardInstructor from "../Pages/Instructor/Dashboard";
  import DocumentosInstructor from "../Pages/Instructor/Documentos";
  import FichasInstructor from "../Pages/Instructor/Fichas";
  import Usuarios from "../Pages/Instructor/Usuarios";
  import VisitasInstructor from "../Pages/Instructor/Visitas";
  
  // Aprendiz Pages
  import BitacorasAprendiz from "../Pages/Aprendiz/Bitacoras";
  import DashboardAprendiz from "../Pages/Aprendiz/Dashboard";
  import DocumentosAprendiz from "../Pages/Aprendiz/Documentos";
  import FichasAprendiz from "../Pages/Aprendiz/Fichas";
  import VisitasAprendiz from "../Pages/Aprendiz/Visitas";
  
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
        { path: "visitas", element: <VisitasInstructor /> },
        { path: "bitacoras", element: <BitacorasInstructor /> },
        { path: "fichas", element: <FichasInstructor /> },
        { path: "documentos", element: <DocumentosInstructor /> },
        { path: "usuarios", element: <Usuarios /> },
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
        { path: "visitas", element: <VisitasAprendiz /> },
        { path: "bitacoras", element: <BitacorasAprendiz /> },
        { path: "fichas", element: <FichasAprendiz /> },
        { path: "documentos", element: <DocumentosAprendiz /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/auth/login" />,
    },
  ]);
  
  export default AppRoutes;
  