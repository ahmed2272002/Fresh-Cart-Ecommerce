export interface OrderProduct {
  _id: string;
  count: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  price: number;
}

export interface OrderAddress {
  city: string;
  details: string;
  phone: string;
  postalCode?: string;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: OrderProduct[];
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: OrderAddress;
  taxPrice?: number;
  shippingPrice?: number;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  __v: number;
  id?: number;
}

export interface OrdersResponse {
  status: string;
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number | null;
  };
  data: Order[];
}

export type UserOrdersResponse = Order[];