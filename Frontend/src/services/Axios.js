import axios from 'axios';

//Funcion para configurar un variable para dispara al url de backend
const apiClientAxios = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL_LOCAL,
    withCredentials: true, //Activar el envio de cookies automaticamente
});

//Interceptor para manejar la respuesta de request, manejando el envio de error por parte del servidor
apiClientAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        // Objeto base en caso de que no haya una respuesta del servidor
        let errorObj = {
            success: false,
            message: 'Error de conexión.',
        };

        //Si no hay una respuesta del servidor, analizamos la causa
        if (!error.response) {
            /**
             * error.message → Mensaje de error relacionado con la configuración (ej. URL inválida, sin conexión).
             * error.request → Indica que la petición se envió pero el servidor no respondió.
             */
            console.error('Sin respuesta: ', error.request || error.message);

            //Si la petición se envió pero no hubo respuesta, usamos un mensaje adecuado.
            errorObj.message = error.request
                ? 'No se recibió respuesta del servidor.'
                : 'Error al configurar la petición.';

            return Promise.reject(errorObj);
        }

        //Si hay una respuesta del servidor
        const { status, data } = error.response;

        //Mostrar detalles solo en modo 'development'
        if (import.meta.env.VITE_APP_MODE === 'development' && data?.error) {
            console.error('Error del servidor: ', status);
            console.error('Detalles del error: ', data.error); // Muestra detalles solo en desarrollo
        }

        //Asignación de errorObj basada en la respuesta del servidor
        errorObj = data || errorObj;

        return Promise.reject(errorObj);
    }
);

export { apiClientAxios };
