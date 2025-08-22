import { Config } from "@/config/Config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const shippingApiSlice = createApi({
  reducerPath: "api/shipping",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.BACKEND_API_URL}/addresses`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("accessToken")}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => "",
    }),

    createAddresses: builder.mutation({
      query: ({ full_address, address_type }) => ({
        url: "",
        method: "post",
        body: { full_address: full_address, address_type: address_type },
      }),
    }),
    deleteAddress: builder.mutation({
      query: ({ id }) => ({
        url: "/" + id,
        method: "delete",
      }),
    }),
  }),
});

export default shippingApiSlice;
