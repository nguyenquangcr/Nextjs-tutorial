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
  const accessTokenUser = getLocalStorage('accessTokenUser');
  if (accessTokenUser) {
    return `Bearer ${accessTokenUser}`;
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
    if (error?.response?.statusText == 'Unauthorized' && error?.response?.status == 401) {
      localStorage.removeItem('accessTokenUser');
      // window.location = domainFE;
    }
  }
);

export default axiosInstance;
