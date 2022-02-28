import { User } from "models";
import { Order } from "./order";

export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination?: PaginationParams;
  productCount?: number;
  addressCount?: number;
  [key: string]: any;
  totalAmount?: number;
  orders?: Order[];
  processingCount?: number;
  deliveredCount?: number;
  refusedCount?: number;
  category?: Array<string>;
  token?: string;
  user?: User;
}

export interface ListParams {
  page?: number;
  keyword?: string | undefined;
  _sort?: string;
  _order?: "asc" | "desc";

  [key: string]: any;
}

export interface Values {
  email: string;
  password: string;
}
