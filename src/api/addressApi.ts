import { Address, ListParams, ListResponse } from "models";
import axiosClient from "./axiosClient";

const addressApi = {
  getAll(params: ListParams): Promise<ListResponse<Address>> {
    const url = "/address";
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<Address> {
    const url = `/address/${id}`;
    return axiosClient.get(url);
  },

  add(data: FormData): Promise<Address> {
    const url = "/admin/address/new";
    return axiosClient.post(url, data);
  },

  update(data: Partial<Address>): Promise<Address> {
    const url = `/address/${data._id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/address/${id}`;
    return axiosClient.delete(url);
  },
};

export default addressApi;
