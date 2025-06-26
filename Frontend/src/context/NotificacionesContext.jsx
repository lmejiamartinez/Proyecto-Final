import React, { createContext, useContext, useEffect, useState } from 'react';
import notificacionesService from '../services/NotificacionesService';

const NotificacionesContext = createContext();

export const useNotificaciones = () => useContext(NotificacionesContext);

export const NotificacionesProvider = ({ id_usuario, children }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [noLeidas, setNoLeidas] = useState(0);

  const cargarNotificaciones = async () => {
    if (!id_usuario) return;
    const { data } = await notificacionesService.obtenerNotificaciones(id_usuario);
    setNotificaciones(data);
    contarNoLeidas();
  };

  const contarNoLeidas = async () => {
    if (!id_usuario) return;
    const { data } = await notificacionesService.contarNoLeidas(id_usuario);
    setNoLeidas(data.noLeidas);
  };

  useEffect(() => {
    cargarNotificaciones();
  }, [id_usuario]);

  return (
    <NotificacionesContext.Provider value={{
      notificaciones,
      noLeidas,
      cargarNotificaciones,
      setNotificaciones,
      setNoLeidas
    }}>
      {children}
    </NotificacionesContext.Provider>
  );
};