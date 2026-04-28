import { baseApi } from './../../api/baseApi';

export const authApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      userLogin: build.mutation({
         query: (loginData) => ({
            url: `/auth/login`,
            method: 'POST',
            data: loginData,
         }),
         invalidatesTags: ["users"],
      }),
      changePassword: build.mutation({
         query: (data) => ({
            url: `/auth/change-password`,
            method: 'POST',
            contentType: 'application/json',
            data: data,
         }),
         invalidatesTags: ["users"],
      }),
      forgotPassword: build.mutation({
         query: (data) => ({
            url: `/auth/forgot-password`,
            method: 'POST',
            data: data,
         }),
         invalidatesTags: ["users"],
      }),
      resetPassword: build.mutation({
         query: (data) => ({
            url: `/auth/reset-password`,
            method: 'POST',
            data: data,
         }),
         invalidatesTags: ["users"],
      }),
   }),
});

export const {
   useUserLoginMutation,
   useChangePasswordMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
} = authApi;