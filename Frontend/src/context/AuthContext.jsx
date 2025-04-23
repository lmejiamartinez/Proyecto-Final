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
  const { data } = response;
  console.log(response);
  return data;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //Estado para almacenar el rol del usuario
  const [roleUsuario, setRoleUsuario] = useState(null);

  //Estado para almacenar el ID del usuario
  const [idUsuario, setIdUsuario] = useState(null);
  //Estado de carga, útil para mostrar indicadores mientras se obtiene el rol del usuario
  const [loading, setLoading] = useState(true);

  /**
   * Función para validar al usuario y obtener su rol e ID.
   * Se realiza una llamada al servicio `userRol` para obtener la información.
   *
   * @returns {Object} Resultado de la validación con el rol e ID del usuario, o un error si la validación falla.
   * @property {boolean} success - Indica si la validación fue exitosa.
   * @property {string|null} rol - Rol del usuario (null si no está autenticado).
   * @property {number|null} idUsuario - ID del usuario (null si no está autenticado).
   * @property {Error|null} error - Error en caso de fallo.
   */
  const validarUsuario = useCallback(async () => {
    try {
      const data = await userRol(); // Cambiamos 'usuario' a 'data' para mayor claridad
      setRoleUsuario(data.usuario.rol); // Accede a la propiedad 'rol' dentro de 'data.usuario'
      console.log(data);
      setIdUsuario(data.usuario.idUsuario); // Accede a la propiedad 'idUsuario' dentro de 'data.usuario'
      setLoading(false);
      return {
        success: true,
        rol: data.usuario.rol,
        idUsuario: data.usuario.idUsuario,
      };
    } catch (error) {
      console.warn("Usuario no autenticado");
      setRoleUsuario(null);
      setIdUsuario(null);
      setLoading(false);
      return {
        success: false,
        rol: null,
        idUsuario: null,
        error,
      };
    } finally {
      setLoading(false); // Asegúrate que esto está
    }
  }, []);

  // fecto para validar el usuario cuando se carge el componente
  useEffect(() => {
    validarUsuario();
  }, []);

  //Valor del contexto memorizado para evitar re-renderizados innecesarios.
  const valueContext = useMemo(
    () => ({ roleUsuario, idUsuario, loading, validarUsuario }),
    [roleUsuario, loading, validarUsuario, idUsuario]
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
