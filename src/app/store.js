import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoAPI";
import { cryptoNewsApi } from "../services/cryptoNewsAPI";

export const store = configureStore({
  reducer: {
   [cryptoApi.reducerPath]: cryptoApi.reducer,
   [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware().concat(cryptoApi.middleware,cryptoNewsApi.middleware),
  

});