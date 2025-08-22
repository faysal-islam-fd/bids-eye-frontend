import { Config } from "@/config/Config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userApiSlice = createApi({
  reducerPath: "api/users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.BACKEND_API_URL}/users`,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("accessToken")}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ limit, page }) => "/orders?limit=" + limit + "&page=" + page,
    }),
    getOrderDetails: builder.query({
      query: (id) => "/orders/" + id,
    }),

    editUser: builder.mutation({
      query: (formData) => ({
        url: "/edit",
        method: "post",
        body: formData,
      }),
    }),
  }),
});

export default userApiSlice;
