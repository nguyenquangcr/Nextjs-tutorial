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
};
