import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryResponceType,
  ProductDeleteRequestType,
  ProductRequestType,
  ProductResponceType,
  ProductResponceType2,
  ProductUpdateRequestType,
  SearchRequestType,
  SearchResponceType,
  SingleProductResponceType,
} from "../../types/productType";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProduct: builder.query<ProductResponceType, string>({
      query: () => "feature",
      providesTags: ["product"],
    }),
    allProduct: builder.query<ProductResponceType, string>({
      query: (id) => `admin-product?id=${id}`,
      providesTags: ["product"],
    }),
    allCategories: builder.query<CategoryResponceType, string>({
      query: () => `categories`,
      providesTags: ["product"],
    }),
    searchProduct: builder.query<SearchResponceType, SearchRequestType>({
      query: ({ search, maxPrice, category, page, sort }) => {
        let base = `all?search=${search}&page=${page}`;

        if (maxPrice) base += `&price=${maxPrice}`;
        if (category) base += `&category=${category}`;
        if (sort) base += `&sort=${sort}`;
        return base;
      },
      providesTags: ["product"],
    }),
    singleProduct: builder.query<SingleProductResponceType, string>({
      query: (id) => `${id}`,
      providesTags: ["product"],
    }),
    createProduct: builder.mutation<ProductResponceType2, ProductRequestType>({
      query: ({ _id, formData }) => ({
        url: `new?id=${_id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<
      ProductResponceType2,
      ProductUpdateRequestType
    >({
      query: ({ _id, formData, productId }) => ({
        url: `${productId}?id=${_id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<
      ProductResponceType2,
      ProductDeleteRequestType
    >({
      query: ({ _id, productId }) => ({
        url: `${productId}?id=${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductQuery,
  useAllProductQuery,
  useAllCategoriesQuery,
  useSearchProductQuery,
  useSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
