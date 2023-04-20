import axios from '../utils/httpServices';
import { domain } from 'Constant';

/**
 * LOGIN
 */
export const userService = {
  login: (data: { username: string; password: string }) => {
    const endpoint = `${domain}/auth/login`;
    return axios.post(endpoint, data);
  },
  getUserInfo: () => {
    const endpoint = `${domain}/auth/user`;
    return axios.get(endpoint);
  },
};
