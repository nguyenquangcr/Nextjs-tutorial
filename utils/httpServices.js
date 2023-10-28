import axios from 'axios';
import { domainFE } from 'Constant';
// ----------------------------------------------------------------------

const getLocalStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    // if the item doesn't exist, return null
    return null;
  }
};

const getLocalToken = () => {
  const accessToken = getLocalStorage('accessToken');
  if (accessToken) {
    return `Bearer ${accessToken}`;
  }
  return null;
};

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers['Authorization'] = getLocalToken();
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('chay vao day', error);
    if (error?.response?.statusText == 'Unauthorized' && error?.response?.status == 401) {
      localStorage.removeItem('accessToken');
      window.location = domainFE;
    }
  }
);

export default axiosInstance;
