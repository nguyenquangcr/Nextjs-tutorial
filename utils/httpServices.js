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
    if (error?.response?.statusText == 'Unauthorized' && error?.response?.status == 401) {
      storage.removeItem('redux-auth');
      storage.removeItem('accessToken');
      // window.location = domainFE;
    }
    // if (
    //   error?.response?.status !== undefined &&
    //   error?.response?.status == 401
    // ) {
    //   window.location = CENTRAL_LOGOUT_ENDPOINT;
    //   storage.removeItem('redux-auth');
    //   storage.removeItem('accessToken');
    // }
    // return Promise.reject(
    //   (error.response && error.response.data) || 'Something went wrong'
    // );
  }
);

export default axiosInstance;

// export const requestAll = (requests, keys) => {
//   return Promise.all(requests)
//     .then(values => {
//       return keys.map((k, index) => {
//         return {
//           [k]: values[index]
//         };
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
