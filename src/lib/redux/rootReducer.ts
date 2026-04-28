import { baseApi } from "./api/baseApi";
import "./features/auth/authApi";
import "./features/careers/jobApplicationApi";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};