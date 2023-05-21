import axios from 'axios';
import { domain } from 'Constant';

/**
 * LOGIN
 */
export const postUserService = {
  getListPostUser: () => {
    const endpoint = `${domain}/post`;
    return axios.get(endpoint);
  },
  getDetailPostUser: (id: string) => {
    const endpoint = `${domain}/post/${id}`;
    return axios.get(endpoint);
  },
  updateTagPostUser: (id: string, tag: string) => {
    const endpoint = `${domain}/post/${id}/updateTag?tag=${tag}`;
    return axios.put(endpoint);
  },
  updateStatusPostUser: (id: string, check: string) => {
    const endpoint = `${domain}/post/${id}?status=${check}`;
    return axios.put(endpoint);
  },
  deletePostUser: (id: string) => {
    const endpoint = `${domain}/post/${id}`;
    return axios.delete(endpoint);
  },

  getListTag: () => {
    const endpoint = `${domain}/tag`;
    return axios.get(endpoint);
  },
  //   //Order
  //   _createOrder: (data: any) => {
  //     const endpoint = `${domain}/order`;
  //     return axios.post(endpoint, data);
  //   },
  //   _getListOrder: () => {
  //     const endpoint = `${domain}/order`;
  //     return axios.get(endpoint);
  //   },
  //   _deleteOrder: (id: string) => {
  //     const endpoint = `${domain}/order/${id}`;
  //     return axios.delete(endpoint);
  //   },
  //   __updateStatusOrder: (id:string, data:any) => {
  //     const endpoint = `${domain}/order/${id}/updateStatus`;
  //     return axios.put(endpoint, data);
  //   }
};
