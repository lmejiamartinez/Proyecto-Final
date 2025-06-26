import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiClientAxios } from "../services/Axios";

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
  const [idFichaAprendiz, setIdFichaAprendiz] = useState(null);
  const [fichaActiva, setFichaActiva] = useState(
    sessionStorage.getItem("fichaActiva") || null
  );

  const validarUsuario = useCallback(async () => {
    try {
      const data = await userRol();
      setRoleUsuario(data.usuario.rol);
      setIdUsuario(data.usuario.idUsuario);
      setIsAuthenticated(true);
      setIdFichaAprendiz(data.usuario.id_ficha_aprendiz);
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
      setFichaActiva(null);
      sessionStorage.removeItem("fichaActiva");
      setIdFichaAprendiz(null);
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
    if (fichaActiva) {
      sessionStorage.setItem("fichaActiva", fichaActiva);
    } else {
      sessionStorage.removeItem("fichaActiva");
    }
  }, [fichaActiva]);

  const valueContext = useMemo(
    () => ({
      roleUsuario,
      idUsuario,
      loading,
      isAuthenticated,
      validarUsuario,
      fichaActiva,
      setFichaActiva,
      idFichaAprendiz,
      setIdFichaAprendiz, // ✅ nuevo valor disponible
    }),
    [
      roleUsuario,
      idUsuario,
      loading,
      isAuthenticated,
      validarUsuario,
      fichaActiva,
      idFichaAprendiz,
      setFichaActiva,
      setIdFichaAprendiz, // ✅ agregado aquí también
    ]
  );

  return (
    <AuthContext.Provider value={valueContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
