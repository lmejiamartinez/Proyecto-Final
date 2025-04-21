import React from "react";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
    </AuthProvider>
  );
}

export default App;

// Componente para proteger rutas
// const PrivateRoute = ({ element, isAuthenticated, rol }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedRol = localStorage.getItem("rol");

//     if (!storedToken) {
//       navigate("/"); // Redirige al login si no hay token
//     }
//   }, [navigate]);

//   return isAuthenticated ? element : <Navigate to="/" replace />;
// };

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRol, setUserRol] = useState(null);

//   useEffect(() => {
//     // Verificar si hay un token al cargar la aplicación
//     const token = localStorage.getItem("token");
//     const rol = localStorage.getItem("rol");
//     if (token) {
//       setIsAuthenticated(true);
//       setUserRol(rol);
//     }
//   }, []);

//   const handleLoginSuccess = (rol) => {
//     setIsAuthenticated(true);
//     setUserRol(rol);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("rol");
//     setIsAuthenticated(false);
//     setUserRol(null);
//     // Puedes redirigir al login aquí si lo deseas: navigate("/");
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Ruta pública de inicio de sesión */}
//         <Route
//           path="/"
//           element={<Login onLoginSuccess={handleLoginSuccess} />}
//         />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         {/* Rutas para INSTRUCTOR */}
//         <Route
//           path="/instructor/*"
//           element={
//             <PrivateRoute
//               isAuthenticated={isAuthenticated}
//               element={<LayoutInstructor />}
//               rol={userRol}
//             />
//           }
//         >
//           <Route index element={<DashboardInstructor />} />
//           <Route path="visitas" element={<VisitasInstructor />} />
//           <Route path="bitacoras" element={<BitacorasInstructor />} />
//           <Route path="fichas" element={<FichasInstructor />} />
//           <Route path="documentos" element={<DocumentosInstructor />} />
//           <Route path="usuarios" element={<Usuarios />} />
//         </Route>

//         {/* Rutas para APRENDIZ */}
//         <Route
//           path="/aprendiz/*"
//           element={
//             <PrivateRoute
//               isAuthenticated={isAuthenticated}
//               element={<LayoutAprendiz />}
//               rol={userRol}
//             />
//           }
//         >
//           <Route index element={<DashboardAprendiz />} />
//           <Route path="visitas" element={<VisitasAprendiz />} />
//           <Route path="bitacoras" element={<BitacorasAprendiz />} />
//           <Route path="fichas" element={<FichasAprendiz />} />
//           <Route path="documentos" element={<DocumentosAprendiz />} />
//         </Route>

//         {/* Ruta para el cierre de sesión (ejemplo) */}
//         <Route path="/logout" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }
