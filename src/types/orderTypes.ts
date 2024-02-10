import { shippingInfoType } from "./productType";

export type NewOrderTYP = {
  shippingInfo: ShippingInfoTYP;
  orderItem: orderItemTYP[];
  user: string;
  subTotal: number;
  shippingCharges: number;
  total: number;
  tax: number;
  discount: number;
  status: string;
  _id: string;
};

export type orderBodyType = {
  shippingInfo: shippingInfoType;

  user: string;
  subTotal: number;
  tax: number;
  total: number;
  shippingCharges: number;
  discount: number;
  orderItem: orderItemTYP[];
};

export type orderItemTYP = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};
export type orderItems = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  id: string;
};
export type ShippingInfoTYP = {
  address: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
};

export type AllOrderType = {
  success: boolean;
  orders: NewOrderTYP[];
};
export type SingleOrderType = {
  success: boolean;
  order: NewOrderTYP;
};
