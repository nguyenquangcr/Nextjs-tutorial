import axios from '../utils/httpServices';
import axiosUser from '../utils/httpServicesUser';
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
  createNewUser: (data: { username: any; password: any; email: any; phoneNumber: any }) => {
    const endpoint = `${domain}/user/register`;
    return axiosUser.post(endpoint, data);
  },
  loginUser: (data: { username: string; password: string }) => {
    const endpoint = `${domain}/auth/login`;
    return axiosUser.post(endpoint, data);
  },
  getUserInfoUser: () => {
    const endpoint = `${domain}/auth/user`;
    return axiosUser.get(endpoint);
  },
  getListUser: () => {
    const endpoint = `${domain}/user`;
    return axios.get(endpoint);
  },
  createUser: (data: any) => {
    const endpoint = `${domain}/user/register`;
    return axios.post(endpoint, data);
  },
  deleteUser: (id: any) => {
    const endpoint = `${domain}/user/${id}`;
    return axios.delete(endpoint);
  },
};
