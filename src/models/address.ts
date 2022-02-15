export interface Address {
  user: string;
  address: string;
  phoneNumber: number | string | undefined;
  company: string;
  [key: string]: any;
}
