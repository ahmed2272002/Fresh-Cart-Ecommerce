import { productIF } from "./product.type";


export interface CartDataIF {
  Status: string;
  Message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartProduct {
  count: number;
  _id: string;
  product: productIF;
  price: number;
}

