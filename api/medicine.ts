import axios from 'axios';
import { domain } from 'Constant';

/**
 * LOGIN
 */
export const medicineService = {
  getListMedicine: () => {
    const endpoint = `${domain}/medicine`;
    return axios.get(endpoint);
  },
  deleteMedicine: (id: string) => {
    const endpoint = `${domain}/medicine/${id}`;
    return axios.delete(endpoint);
  },
  //Order
  _createOrder: (data: any) => {
    const endpoint = `${domain}/order`;
    return axios.post(endpoint, data);
  },
  _getListOrder: () => {
    const endpoint = `${domain}/order`;
    return axios.get(endpoint);
  },
  _deleteOrder: (id: string) => {
    const endpoint = `${domain}/order/${id}`;
    return axios.delete(endpoint);
  },
  __updateStatusOrder: (id:string, data:any) => {
    const endpoint = `${domain}/order/${id}/updateStatus`;
    return axios.put(endpoint, data);
  }
};
