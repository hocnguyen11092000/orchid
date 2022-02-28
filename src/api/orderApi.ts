import { ListParams, ListResponse, Product } from "models";
import { Order } from "models/order";
import axiosClient from "./axiosClient";

const orderApi = {
  getAll(): Promise<ListResponse<Order>> {
    const url = "/admin/orders/";
    return axiosClient.get(url);
  },

  getById(id: string): Promise<any> {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  add(data: FormData): Promise<Product> {
    const url = "/order/new";
    return axiosClient.post(url, data);
  },

  update(id: string, status: any): Promise<any> {
    const url = `/admin/order/${id}`;
    return axiosClient.put(url, { status });
  },

  remove(id: string): Promise<any> {
    const url = `/admin/order/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
