import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiClientAxios } from "../services/Axios";

//Funcion para verificar el rol del usuario desde el backend
const userRol = async () => {
  const response = await apiClientAxios.get("/auth/verificar");
  return response.data;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roleUsuario, setRoleUsuario] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  //Estado para la ficha activa
  const [fichaActiva, setFichaActiva] = useState(null); //null significa que no hay ningina seleccionada

  const validarUsuario = useCallback(async () => {
    try {
      const data = await userRol();
      setRoleUsuario(data.usuario.rol);
      setIdUsuario(data.usuario.idUsuario);
      setIsAuthenticated(true);
      return {
        success: true,
        rol: data.usuario.rol,
        idUsuario: data.usuario.idUsuario,
        id_ficha_aprendiz: data.usuario.id_ficha_aprendiz,
      };
    } catch (error) {
      console.warn("Usuario no autenticado", error);
      setRoleUsuario(null);
      setIdUsuario(null);
      setIsAuthenticated(false);
      setFichaActiva(null); //Limpiar ficha activa si no hay usuario

      return {
        success: false,
        rol: null,
        idUsuario: null,
        id_ficha_aprendiz: null,
        error,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    validarUsuario();
  }, []);
  useEffect(() => {
    console.log("ROL:", roleUsuario);
    console.log("Autenticado:", isAuthenticated);
    console.log("Cargando:", loading);
  }, [roleUsuario, isAuthenticated, loading]);
  const valueContext = useMemo(
    () => ({
      roleUsuario,
      idUsuario,
      loading,
      isAuthenticated,
      validarUsuario,
      fichaActiva,
      setFichaActiva,
    }),
    [
      roleUsuario,
      idUsuario,
      loading,
      isAuthenticated,
      validarUsuario,
      fichaActiva,
    ]
  );

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado en AuthProvider");
  }
  return context;
};
