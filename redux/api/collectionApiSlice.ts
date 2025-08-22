import { Config } from "@/config/Config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const collectionApiSlice = createApi({
  reducerPath: "api/collections",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.BACKEND_API_URL}/collections`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      // Only attach Authorization header if we actually have a token on the client
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
    getAllCollections: builder.query({
      query: () => "",
    }),
    getProductsByCollectionSlug: builder.query({
      query: (slug) => "/get-products-by-collection/" + slug,
    }),
    getAllCollectionsWithProducts: builder.query({
      query: () => "/view-with-products",
    }),
  }),
});

export default collectionApiSlice;
