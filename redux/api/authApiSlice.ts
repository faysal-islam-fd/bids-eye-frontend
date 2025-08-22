import { Config } from "@/config/Config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApiSlice = createApi({
  reducerPath: "api/auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.BACKEND_API_URL}/auth`,
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
    sendSignupOtp: builder.mutation({
      query: (email) => ({
        url: "/signup-otp",
        method: "post",
        body: { email: email },
      }),
    }),
    signup: builder.mutation({
      query: ({
        email,
        password,
        varificationCode,
        firstName,
        passwordConfirmation,
        phone,
      }) => ({
        url: "/signup",
        method: "post",
        body: {
          firstName: firstName,
          email: email,
          verificationCode: varificationCode,
          password: password,
          password_confirmation: passwordConfirmation,
          phone: phone,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "post",
        body: {
          email: email,
          password: password,
        },
      }),
    }),

    sendResetPasswordLink: builder.mutation({
      query: ({ email, frontendURL }) => ({
        url: "/reset-password-mail",
        method: "post",
        body: { email: email, frontendURL: frontendURL },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({
        password_reset_token,
        email,
        password,
        password_confirmation,
      }) => ({
        url: "/reset-password",
        method: "post",
        body: {
          password_reset_token: password_reset_token,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        },
      }),
    }),

    getAuthInfo: builder.query({
      query: () => "/info",
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "post",
      }),
    }),
  }),
});

export default authApiSlice;
