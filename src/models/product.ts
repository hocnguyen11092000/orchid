export interface Images {
  publicId: string;
  url: string;
  [key: string]: any;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number | string;
  discount: number | string;
  weight: number | string;
  unit?: string;
  images: Images[] | Array<any>;
  category: string;
  user?: string;
  numOfReviews?: number;
  stock: number | string;
  ratings?: number;
}
