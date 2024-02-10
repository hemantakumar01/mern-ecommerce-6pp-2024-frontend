import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  CartInitialType,
  CartItem,
  shippingInfoType,
} from "../types/productType";

const initialState: CartInitialType = {
  loading: false,
  discount: 0,
  orderItem: [],
  shippingCharges: 0,
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    pinCode: 0,
    state: "",
  },
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const index = state.orderItem.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (index !== -1) {
        state.orderItem[index] = action.payload;
      } else {
        state.orderItem.push(action.payload);
      }
      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.orderItem = state.orderItem.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      const subTotal = state.orderItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subTotal = subTotal;
      (state.shippingCharges = state.subTotal > 1000 ? 0 : 200),
        (state.discount = 0),
        (state.tax = Math.round(state.subTotal * 0.18)),
        (state.total =
          state.subTotal + state.tax + state.shippingCharges - state.discount);
    },
    discountOnCoupon: (state, action) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<shippingInfoType>) => {
      state.shippingInfo = action.payload;
    },
    resetShippingInfo: () => initialState,
  },
});
export const {
  addCartItem,
  removeFromCart,
  calculatePrice,
  discountOnCoupon,
  saveShippingInfo,
  resetShippingInfo,
} = cartSlice.actions;
