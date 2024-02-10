import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrderType,
  SingleOrderType,
  orderBodyType,
} from "../../types/orderTypes";
import { ProductResponceType2 } from "../../types/productType";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<ProductResponceType2, orderBodyType>({
      query: (order) => ({
        url: "latest",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation<
      ProductResponceType2,
      { productId: string; userId: string }
    >({
      query: (user) => ({
        url: `${user.productId}?id=${user.userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation<
      ProductResponceType2,
      { productId: string; userId: string }
    >({
      query: (user) => ({
        url: `${user.productId}?id=${user.userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    getAllOrder: builder.query<AllOrderType, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["orders"],
    }),
    getSingleOrder: builder.query<
      SingleOrderType,
      { productId: string; userId: string }
    >({
      query: (order) => `${order.productId}?id=${order.userId}`,
      providesTags: ["orders"],
    }),
    myOrder: builder.query<AllOrderType, string>({
      query: (user) => `my/${user}`,
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrderQuery,
  useGetAllOrderQuery,
  useGetSingleOrderQuery,
} = orderApi;
