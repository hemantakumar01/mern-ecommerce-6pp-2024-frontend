import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./Api/userApi";
import userReducer from "./userReducer";
import { productApi } from "./Api/product";
import { cartSlice } from "./cartReducer";
import { orderApi } from "./Api/orderApi";
import statApi from "./Api/statApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [statApi.reducerPath]: statApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      statApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
