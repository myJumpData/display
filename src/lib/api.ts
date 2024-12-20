import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4444`,
  }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  tagTypes: [],
  endpoints: (builder) => ({
    getSystemData: builder.query({
      query: () => "/sys",
    }),
    getDisplay: builder.query({
      query: (params) =>
        `/local-server?${new URLSearchParams(params).toString()}`,
    }),
  }),
});

export const API = api;

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
