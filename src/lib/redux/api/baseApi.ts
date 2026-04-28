/* eslint-disable @typescript-eslint/no-explicit-any */

import {
   
    BaseQueryFn,
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  import { RootState } from "../store";
  


  const baseQuery = fetchBaseQuery({
    baseUrl: 
        process.env.NEXT_PUBLIC_BACKEND_URL ,

    // "http://localhost:5000/api/v1/jobs",
    //below the line set the cookies on browser
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState & { auth: { token: string } }).auth?.token;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  });
  
  const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  { status?: number; data?: any }
> = async (arg, api, extraOptions) => {

    const result:any = await baseQuery(arg, api, extraOptions);
  
   
      

  
    return result;
  };
  
  export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes:["users","bookings","payments","jobs"],
    endpoints: () => ({}),
  });