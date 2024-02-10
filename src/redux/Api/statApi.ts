import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BarResponce,
  LineResponce,
  PaiResponce,
  StatsResponce,
} from "../../types/stats-type";

const statApi = createApi({
  reducerPath: "statApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/stats/`,
  }),
  endpoints: (builder) => ({
    stats: builder.query<StatsResponce, string>({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    bar: builder.query<BarResponce, string>({
      query: (id) => `bars/?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    pie: builder.query<PaiResponce, string>({
      query: (id) => `pie/?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    line: builder.query<LineResponce, string>({
      query: (id) => `line/?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useBarQuery, usePieQuery, useLineQuery, useStatsQuery } =
  statApi;

export default statApi;
