import { Config } from "@/config/Config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const productApiSlice = createApi({
  reducerPath: "api/products",
  tagTypes: ["Search"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.BACKEND_API_URL}/products`,

    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      
      // Check if localStorage is available (client-side only)
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("accessToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllFeaturedProducts: builder.query({
      query: () => "/featured-products",
    }),
    getRelatedProducts: builder.query({
      query: ({ slug, page }) => `/related-products/${slug}?page=${page}`,
    }),
    getAllProductsGroupByCategories: builder.query({
      query: () => "/group-by-category",
    }),
    getProductDetails: builder.query({
      query: (slug) => "/" + slug,
    }),
    getBySingleCategory: builder.query({
      query: ({ id, limit, page, sub_id }) =>
        "/load-by-categories/" +
        id +
        "?limit=" +
        limit +
        "&page=" +
        page +
        "&sub_id=" +
        sub_id,
    }),
    searchProducts: builder.query({
      query: (qStr) => {
        // qStr এখানে পরিপূর্ণ হতে হবে। যদি qStr খালি থাকে, তবে ডিফল্ট কিছু ফেরত দেওয়া যেতে পারে
        return "/search" + qStr;
      },
      providesTags: ["Search"],
    }),
    filterOptions: builder.query({
      query: () => "/filter-options",
    }),
  }),
});

export default productApiSlice;
