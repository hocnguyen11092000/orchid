import { Images } from "./product";

export interface ShippingInfo {
  name: string;
  address: string;
  phoneNo: number;
  gender: string;
}

export interface PaymentInfo {
  id?: any;
  status?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  weight: number;
  discount: number;
  image: Images;
  product: string;
}

export interface Order {
  _id: string;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  orderItems: OrderItem[];
  user: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;

  [key: string]: any;
}
