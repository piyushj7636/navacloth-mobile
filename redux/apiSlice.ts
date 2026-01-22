import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiUtils";

type User = {
  phone: number,
  phoneVerified: boolean,
  phoneOTP: string,
  name: string
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
	refetchOnFocus: true,
  refetchOnReconnect: true,
	tagTypes: ['Auth'],
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (formattedPhone) => ({
        url: '/auth/signup',
        method: 'POST',
        body: formattedPhone,
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
			invalidatesTags: ['Auth']
    }),
    verifyOtp: build.mutation<User, any>({
      query: (body) => ({
        url: '/auth/verify-signup',
        method: 'POST',
        body
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
			invalidatesTags: ['Auth']
    }),
    login: build.mutation<User, any>({
      query: (formattedPhone) => ({
        url: '/auth/login',
        method: 'POST',
        body: formattedPhone
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
			invalidatesTags: ['Auth']
    }),
    verifyLogin: build.mutation<User, any>({
      query: (body) => ({
        url: '/auth/verify-login',
        method: 'POST',
        body
      }),
      transformResponse: (response: { data: User }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
			invalidatesTags: ['Auth']
    }),
    getUser: build.query<User, void>({
      query: () => '/auth/user',
			providesTags: ['Auth'],
    }),
    userLogout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
			invalidatesTags: ['Auth']
    })
  }),
});

export const { useCreateUserMutation, useVerifyOtpMutation, useGetUserQuery, useLoginMutation, useVerifyLoginMutation, useUserLogoutMutation } = apiSlice