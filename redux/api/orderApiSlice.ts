import { Config } from "@/config/Config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const orderApiSlice = createApi({
  reducerPath: "api/orders",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.BACKEND_API_URL}/orders`,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("accessToken")}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    payment: builder.mutation({
      query: (data) => ({
        url: "/payment",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export default orderApiSlice;
