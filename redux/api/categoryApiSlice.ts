import { Config } from "@/config/Config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const categoryApiSlice = createApi({
  reducerPath: "api/category",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.BACKEND_API_URL}/categories`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getByProductCount: builder.query({
      query: () => "/by-product-count",
    }),
    getWithSubcategories: builder.query({
      query: () => "/with-subcategories",
    }),
  }),
});

export default categoryApiSlice;
