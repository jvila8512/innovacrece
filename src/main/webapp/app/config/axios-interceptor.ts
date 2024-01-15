import axios from 'axios';
import { Storage } from 'react-jhipster';

const TIMEOUT = 2 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = response => response;

  const onResponseError = err => {
    const status = err.status || (err.response ? err.response.status : 0);

    if (status === 403 || status === 401) {
      const customErrorMessage = 'No autorizado. No tiene permisos para acceder a la página.';
      err.message = customErrorMessage;
      onUnauthenticated();
    }
    if (err.response && status === 500) {
      const customErrorMessage = err.response.data.detail;
      err.response.data.message = 'Error interno del servidor.';
      err.message = 'Error interno del servidor.';
    }

    if (status === 504) {
      const customErrorMessage = 'Error en el servidor...';
      err.response.data.message = 'Error interno del servidor..';
    }
    if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
      // Aquí puedes personalizar el mensaje de error cuando se excede el tiempo de espera
      const customErrorMessage = 'Conexión muy lenta. Se ha excedido el tiempo de espera de la solicitud';
      err.message = customErrorMessage;
    }

    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
