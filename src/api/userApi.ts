import { Address, ListParams, ListResponse, User } from "models";
import axiosClient from "./axiosClient";

const userApi = {
  getAll(params: ListParams): Promise<ListResponse<User>> {
    const url = "/admin/users";
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<User> {
    const url = `/admin/user/${id}`;
    return axiosClient.get(url);
  },

  getMe(): Promise<User> {
    const url = `/me`;
    return axiosClient.get(url);
  },

  add(data: FormData): Promise<User> {
    const url = "/register";
    return axiosClient.post(url, data);
  },

  update(data: Partial<User>): Promise<User> {
    const url = `/me/update`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/admin/user/${id}`;
    return axiosClient.delete(url);
  },

  forgotPassword(email: any): Promise<any> {
    const url = "/password/forgot";
    return axiosClient.post(url, { email });
  },

  resetPassword(token: string, data: any): any {
    const url = `/password/reset/${token}`;
    return axiosClient.put(url, data);
  },
};

export default userApi;
