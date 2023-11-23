import axios from 'axios';
// import { domain } from 'Constant';

/**
 * LOGIN
 */
export const provinceCityService = {
  getListProvinceCity: () => {
    const endpoint = `https://provinces.open-api.vn/api/`;
    return axios.get(endpoint);
  },
  getListDistrict: (id: string) => {
    const endpoint = `https://provinces.open-api.vn/api/p/${id}?depth=2`;
    return axios.get(endpoint);
  },
  getListWard: (id: string) => {
    const endpoint = `https://provinces.open-api.vn/api/d/${id}?depth=2`;
    return axios.get(endpoint);
  }
}