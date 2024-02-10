export interface ProductType {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponceType {
  success: boolean;
  products: ProductType[];
}

export interface CustomError {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
}

export interface CategoryResponceType {
  success: boolean;
  categories: string[];
}
export interface SearchResponceType {
  success: boolean;
  product: ProductType[];
  totalPage: number;
}
export interface SearchRequestType {
  sort: string;
  category: string;
  maxPrice: number;
  page: number;
  search: string;
}

export interface ProductResponceType2 {
  success: boolean;
  message: string;
}

export interface ProductRequestType {
  _id: string;
  formData: FormData;
}
export interface ProductUpdateRequestType {
  productId: string;
  _id: string;
  formData: FormData;
}
export interface ProductDeleteRequestType {
  productId: string;
  _id: string;
}
export interface SingleProductResponceType {
  success: boolean;
  product: ProductType;
}

export interface UpdateProductType {
  name: string;
  category: string;
  price: Number;
  stock: Number;
}
export type shippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};
export type CartItem = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
  stock: number;
};
export type CartInitialType = {
  shippingInfo: shippingInfoType;
  loading: boolean;
  subTotal: number;
  tax: number;
  total: number;
  shippingCharges: number;
  discount: number;
  orderItem: CartItem[];
};
